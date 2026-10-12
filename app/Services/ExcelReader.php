<?php

namespace App\Services;

use SimpleXMLElement;

/**
 * Dependency-free spreadsheet reader for .xlsx and .csv files.
 *
 * The project does not have the PHP "zip" extension enabled and no Excel
 * library is installed, so this class reads the ZIP container of an .xlsx
 * file manually (using the zlib functions that ARE available) and parses the
 * underlying XML with SimpleXML. It also handles plain .csv uploads.
 *
 * The public entry point is read(), which returns an array of associative
 * rows keyed by the (cleaned) header names.
 */
class ExcelReader
{
    private array $errors = [];

    /**
     * Read a spreadsheet file and return its rows as associative arrays.
     *
     * @return array<int, array<string, string>>
     */
    public function read(string $absolutePath, string $originalName): array
    {
        $this->errors = [];

        $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

        return match ($extension) {
            'csv', 'txt' => $this->readCsv($absolutePath),
            'xlsx' => $this->readXlsx($absolutePath),
            default => $this->readCsv($absolutePath),
        };
    }

    public function errors(): array
    {
        return $this->errors;
    }

    /**
     * Parse a CSV file into associative rows.
     *
     * @return array<int, array<string, string>>
     */
    private function readCsv(string $path): array
    {
        $rows = [];

        if (($handle = fopen($path, 'rb')) === false) {
            $this->errors[] = 'Unable to open the uploaded file.';

            return $rows;
        }

        $header = null;
        while (($data = fgetcsv($handle, 0, ',', '"', '\\')) !== false) {
            // Skip completely blank lines.
            if (count($data) === 1 && trim((string) ($data[0] ?? '')) === '') {
                continue;
            }

            if ($header === null) {
                $header = array_map([$this, 'cleanHeader'], $data);

                continue;
            }

            // Guard against ragged rows.
            if (count($data) > count($header)) {
                $data = array_slice($data, 0, count($header));
            }

            $row = [];
            foreach ($header as $i => $key) {
                $row[$key] = isset($data[$i]) ? trim((string) $data[$i]) : '';
            }
            $rows[] = $row;
        }

        fclose($handle);

        return $rows;
    }

    /**
     * Parse an .xlsx file into associative rows.
     *
     * @return array<int, array<string, string>>
     */
    private function readXlsx(string $path): array
    {
        $files = $this->unzip($path);

        if ($files === null) {
            return [];
        }

        $sheetXml = $files['xl/worksheets/sheet1.xml'] ?? null;
        $sharedStrings = [];

        if (isset($files['xl/sharedStrings.xml'])) {
            $sharedStrings = $this->parseSharedStrings($files['xl/sharedStrings.xml']);
        }

        if ($sheetXml === null) {
            $this->errors[] = 'The workbook does not contain a readable worksheet.';

            return [];
        }

        return $this->parseSheet($sheetXml, $sharedStrings);
    }

    /**
     * Extract the required XML parts from an .xlsx (ZIP) archive without the
     * zip extension. Returns a map of entry name => raw contents.
     *
     * @return array<string, string>|null
     */
    private function unzip(string $path): ?array
    {
        $contents = @file_get_contents($path);
        if ($contents === false || $contents === '') {
            $this->errors[] = 'Unable to read the uploaded file.';

            return null;
        }

        if (strrpos($contents, "PK\x05\x06") === false) {
            $this->errors[] = 'The file is not a valid .xlsx workbook.';

            return null;
        }

        $result = [];
        $offset = 0;

        // Walk every local file header in the archive.
        while (($local = strpos($contents, "PK\x03\x04", $offset)) !== false) {
            $offset = $local + 4;

            $header = substr($contents, $local, 30);
            if (strlen($header) < 30) {
                break;
            }

            $meta = unpack(
                'vversion/vflags/vmethod/vtime/vdate/Vcrc/Vcsize/Vusize/vnameLen/vextraLen',
                substr($header, 4, 28)
            );

            if ($meta === false) {
                break;
            }

            $nameLen = $meta['nameLen'];
            $extraLen = $meta['extraLen'];
            $nameStart = $local + 30;
            $name = substr($contents, $nameStart, $nameLen);
            $dataStart = $nameStart + $nameLen + $extraLen;

            $compressedSize = $meta['csize'];
            $method = $meta['method'];

            // If the size is unknown, bound the payload by the next header.
            if ($compressedSize <= 0) {
                $next = strpos($contents, "PK\x03\x04", $dataStart);
                $compressedSize = ($next === false ? strlen($contents) : $next) - $dataStart;
            }

            $data = substr($contents, $dataStart, $compressedSize);

            $result[$name] = match ($method) {
                0 => $data,                 // stored
                8 => $this->inflate($data), // deflate
                default => '',
            };
        }

        return $result;
    }

    /**
     * Inflate raw DEFLATE data (with a tolerant fallback for zlib streams).
     */
    private function inflate(string $data): string
    {
        $out = @gzinflate($data);
        if ($out !== false) {
            return $out;
        }

        $out = @gzuncompress($data);
        if ($out !== false) {
            return $out;
        }

        // Last resort: strip a 2-byte zlib header and inflate.
        return @gzinflate(substr($data, 2)) ?: '';
    }

    /**
     * Build the shared-strings lookup table.
     *
     * @return array<int, string>
     */
    private function parseSharedStrings(string $xml): array
    {
        $strings = [];

        try {
            $sx = new SimpleXMLElement($xml);
        } catch (\Throwable $e) {
            return $strings;
        }

        foreach ($sx->si as $si) {
            $strings[] = $this->extractText($si);
        }

        return $strings;
    }

    /**
     * Extract concatenated text from a shared-string <si> node.
     */
    private function extractText(SimpleXMLElement $node): string
    {
        $text = (string) $node->t;

        if ($text === '' && isset($node->r)) {
            foreach ($node->r as $run) {
                $text .= (string) $run->t;
            }
        }

        return $text;
    }

    /**
     * Parse a worksheet XML into associative rows using column indices.
     *
     * @param  array<int, string>  $sharedStrings
     * @return array<int, array<string, string>>
     */
    private function parseSheet(string $xml, array $sharedStrings): array
    {
        try {
            $sx = new SimpleXMLElement($xml);
        } catch (\Throwable $e) {
            $this->errors[] = 'Unable to parse the worksheet.';

            return [];
        }

        $rawRows = [];

        foreach ($sx->sheetData->row as $row) {
            $cells = [];

            foreach ($row->c as $cell) {
                $ref = (string) $cell['r'];            // e.g. "B3"
                $type = (string) $cell['t'];           // s | str | inlineStr | b | n
                $columnIndex = $this->columnToIndex($this->columnFromRef($ref));

                $value = '';
                if ($type === 's') {
                    $idx = (int) $cell->v;
                    $value = $sharedStrings[$idx] ?? '';
                } elseif ($type === 'inlineStr') {
                    $value = $this->extractText($cell->is);
                } else {
                    $value = (string) $cell->v;
                    if ($type === 'b') {
                        $value = $value === '1' ? 'TRUE' : 'FALSE';
                    }
                }

                $cells[$columnIndex] = trim($value);
            }

            if (! empty($cells)) {
                ksort($cells);
                $rawRows[] = $cells;
            }
        }

        if (empty($rawRows)) {
            return [];
        }

        // First non-empty row is the header row.
        $headerRow = array_shift($rawRows);
        $header = [];
        foreach ($headerRow as $colIndex => $value) {
            $header[$colIndex] = $this->cleanHeader($value);
        }

        $rows = [];
        foreach ($rawRows as $cells) {
            $row = [];
            foreach ($header as $colIndex => $key) {
                $row[$key] = $cells[$colIndex] ?? '';
            }
            $rows[] = $row;
        }

        return $rows;
    }

    /**
     * Convert a cell reference like "AB12" to its column letters "AB".
     */
    private function columnFromRef(string $ref): string
    {
        return preg_replace('/[^A-Za-z]/', '', $ref) ?: 'A';
    }

    /**
     * Convert column letters ("A", "AB") to a 1-based index.
     */
    private function columnToIndex(string $letters): int
    {
        $index = 0;
        $letters = strtoupper($letters);
        $length = strlen($letters);

        for ($i = 0; $i < $length; $i++) {
            $index = $index * 26 + (ord($letters[$i]) - 64);
        }

        return $index;
    }

    /**
     * Normalise a header cell: trim, strip BOM/zero-width chars, collapse
     * spaces/underscores/hyphens/dots, and lowercase. Tolerant of the messy
     * headers used in the source spreadsheet.
     */
    private function cleanHeader($value): string
    {
        $value = (string) $value;
        // Remove BOM and zero-width characters.
        $value = preg_replace('/[\x{FEFF}\x{200B}\x{200C}\x{200D}]/u', '', $value) ?? $value;
        $value = trim($value);
        $value = strtolower($value);
        $value = preg_replace('/[\s_\-\.]+/', '', $value) ?? $value;

        return $value;
    }
}
