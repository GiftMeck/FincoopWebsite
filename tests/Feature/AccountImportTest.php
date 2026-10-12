<?php

namespace Tests\Feature;

use App\Models\Account;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class AccountImportTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Build a minimal, valid .xlsx file. $deflate=true produces deflated
     * (compressed) entries like real Excel; false produces stored entries.
     * First array element is the header row.
     */
    private function makeXlsx(array $rows, bool $deflate = false): string
    {
        $allStrings = [];
        $stringIndex = [];
        $register = function ($s) use (&$allStrings, &$stringIndex) {
            if (!isset($stringIndex[$s])) {
                $stringIndex[$s] = count($allStrings);
                $allStrings[] = $s;
            }
            return $stringIndex[$s];
        };
        $colLetter = function ($i) {
            $s = '';
            $i++;
            while ($i > 0) {
                $m = ($i - 1) % 26;
                $s = chr(65 + $m) . $s;
                $i = ($i - $m - 1) / 26;
            }
            return $s;
        };
        $sheetRows = '';
        foreach ($rows as $r => $row) {
            $sheetRows .= '<row r="' . ($r + 1) . '">';
            foreach ($row as $c => $val) {
                $ref = $colLetter($c) . ($r + 1);
                $sheetRows .= '<c r="' . $ref . '" t="s"><v>' . $register((string) $val) . '</v></c>';
            }
            $sheetRows .= '</row>';
        }
        $sheetXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>' . $sheetRows . '</sheetData></worksheet>';
        $sharedItems = '';
        foreach ($allStrings as $s) {
            $sharedItems .= '<si><t>' . htmlspecialchars($s, ENT_QUOTES) . '</t></si>';
        }
        $sharedXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><sst count="' . count($allStrings) . '">' . $sharedItems . '</sst>';
        $files = [
            '[Content_Types].xml' => '<?xml version="1.0"?><Types><Default Extension="xml"/></Types>',
            'xl/worksheets/sheet1.xml' => $sheetXml,
            'xl/sharedStrings.xml' => $sharedXml,
        ];
        $method = $deflate ? 8 : 0;
        $zip = '';
        $central = '';
        $offset = 0;
        foreach ($files as $name => $content) {
            $payload = $deflate ? gzdeflate($content, 9) : $content;
            $nameLen = strlen($name);
            $crc = crc32($content);
            $local = "PK\x03\x04" . pack('v', 20) . pack('v', 0) . pack('v', $method) . pack('v', 0) . pack('v', 0) . pack('V', $crc) . pack('V', strlen($payload)) . pack('V', strlen($content)) . pack('v', $nameLen) . pack('v', 0) . $name . $payload;
            $zip .= $local;
            $central .= "PK\x01\x02" . pack('v', 20) . pack('v', 20) . pack('v', 0) . pack('v', $method) . pack('v', 0) . pack('v', 0) . pack('V', $crc) . pack('V', strlen($payload)) . pack('V', strlen($content)) . pack('v', $nameLen) . pack('v', 0) . pack('v', 0) . pack('v', 0) . pack('V', 0) . pack('V', $offset) . $name;
            $offset += strlen($local);
        }
        $eocd = "PK\x05\x06" . pack('v', 0) . pack('v', 0) . pack('v', count($files)) . pack('v', count($files)) . pack('V', strlen($central)) . pack('V', $offset) . pack('v', 0);

        return $zip . $central . $eocd;
    }

    private function sampleRows(): array
    {
        return [
            ['Branch', 'Base No', 'salutation', 'FullName', 'IDType', 'idno', 'Gende', 'YEARBIRTH', 'MaritalStatus', 'Mobile', 'Email', 'entrydate', 'Employer', 'jobNumber', 'Relationship Manager', 'Membership Status', 'Account Status'],
            ['Lilongwe', 'FIN-0001', 'Mr', 'Alice Banda', 'National ID', 'ID1', 'Female', '1990', 'Single', '+265991000001', 'a@x.com', '2024-01-01', 'FINCOOP', 'J1', 'RM1', 'Member', 'Active'],
            ['Blantyre', 'FIN-0002', 'Mr', 'Bob Chima', 'National ID', 'ID2', 'Male', '1988', 'Married', '+265991000002', 'b@x.com', '2024-02-01', 'FINCOOP', 'J2', 'RM2', 'Member', 'Active'],
            ['Mzuzu', '', 'Mr', 'No Base', 'National ID', 'ID3', 'Male', '1995', 'Single', '+265991000003', 'c@x.com', '2024-03-01', 'FINCOOP', 'J3', 'RM3', 'Member', 'Active'],
        ];
    }

    public function test_verify_endpoint_is_public_and_validates_existence(): void
    {
        Account::create(['account_number' => 'FIN-0001', 'full_name' => 'Alice']);

        $this->getJson('/accounts/verify?account_number=FIN-0001')
            ->assertOk()
            ->assertJson(['exists' => true]);

        $this->getJson('/accounts/verify?account_number=%20%20fin-0001%20')
            ->assertOk()
            ->assertJson(['exists' => true]);

        $this->getJson('/accounts/verify?account_number=FIN-9999')
            ->assertNotFound()
            ->assertJson(['exists' => false]);
    }

    public function test_verify_requires_an_account_number(): void
    {
        $this->getJson('/accounts/verify')->assertStatus(422);
    }

    public function test_authenticated_user_can_import_csv(): void
    {
        $user = User::factory()->create();
        $csv = "Branch,Base No,FullName,Gende\nLilongwe,FIN-C1,Test User,Male\nMzuzu,FIN-C2,Jane Doe,Female\n";
        $file = UploadedFile::fake()->createWithContent('accounts.csv', $csv);

        $this->actingAs($user)
            ->post('/accounts', ['file' => $file, 'mode' => 'append'])
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertSame(2, Account::count());
        $this->assertTrue(Account::existsForAccountNumber('FIN-C1'));
    }

    public function test_authenticated_user_can_import_stored_xlsx(): void
    {
        $user = User::factory()->create();
        $file = UploadedFile::fake()->createWithContent('accounts.xlsx', $this->makeXlsx($this->sampleRows(), false));

        $this->actingAs($user)
            ->post('/accounts', ['file' => $file, 'mode' => 'replace'])
            ->assertRedirect()
            ->assertSessionHas('success');

        // 3 data rows, one without Base No is skipped -> 2 imported.
        $this->assertSame(2, Account::count());
        $this->assertSame('Alice Banda', Account::where('account_number', 'FIN-0001')->value('full_name'));
        $this->assertSame('Female', Account::where('account_number', 'FIN-0001')->value('gender'));
    }

    public function test_authenticated_user_can_import_deflated_xlsx(): void
    {
        $user = User::factory()->create();
        $file = UploadedFile::fake()->createWithContent('accounts.xlsx', $this->makeXlsx($this->sampleRows(), true));

        $this->actingAs($user)
            ->post('/accounts', ['file' => $file, 'mode' => 'replace'])
            ->assertRedirect();

        $this->assertSame(2, Account::count());
    }

    public function test_import_requires_a_file(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/accounts', [])
            ->assertSessionHasErrors('file');
    }

    public function test_template_download_returns_csv(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/accounts/template');

        $response->assertOk();
        $this->assertStringContainsString('Base No', $response->streamedContent());
    }

    public function test_accounts_index_requires_auth(): void
    {
        $this->get('/accounts')->assertRedirect('/login');
    }

    public function test_delete_account(): void
    {
        $user = User::factory()->create();
        $account = Account::create(['account_number' => 'FIN-DEL', 'full_name' => 'Delete Me']);

        $this->actingAs($user)
            ->delete("/accounts/{$account->id}")
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('accounts', ['account_number' => 'FIN-DEL']);
    }
}

