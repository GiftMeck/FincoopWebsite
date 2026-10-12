<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Services\ExcelReader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * List imported member accounts for the dashboard tab.
     */
    public function index(Request $request)
    {
        $query = Account::query();

        if ($request->filled('search')) {
            $query->search($request->string('search')->toString());
        }

        if ($request->filled('membership_status')) {
            $query->where('membership_status', $request->string('membership_status')->toString());
        }

        if ($request->filled('account_status')) {
            $query->where('account_status', $request->string('account_status')->toString());
        }

        $accounts = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('accounts/Index', [
            'accounts' => $accounts,
            'filters' => [
                'search' => $request->string('search')->toString(),
                'membership_status' => $request->string('membership_status')->toString(),
                'account_status' => $request->string('account_status')->toString(),
            ],
            'stats' => [
                'total' => Account::count(),
                'active' => Account::whereRaw('LOWER(account_status) = ?', ['active'])->count(),
                'members' => Account::whereRaw('LOWER(membership_status) = ?', ['member'])->count(),
            ],
        ]);
    }

    /**
     * Handle an Excel/CSV upload and import the rows into the accounts table.
     */
    public function store(Request $request, ExcelReader $reader)
    {
        $validated = $request->validate([
            'file' => ['required', 'file', 'mimes:csv,txt,xlsx', 'max:20480'],
            'mode' => ['nullable', 'in:append,replace'],
        ], [
            'file.required' => 'Please choose a spreadsheet file to upload.',
            'file.mimes' => 'The file must be a .csv or .xlsx file.',
            'file.max' => 'The file may not be larger than 20MB.',
        ]);

        $mode = $validated['mode'] ?? 'append';
        $file = $request->file('file');
        $path = $file->getRealPath();
        $batch = (string) Str::uuid();

        $rows = $reader->read($path, $file->getClientOriginalName());

        if (! empty($reader->errors())) {
            return redirect()->back()->with('error', $reader->errors()[0]);
        }

        if (empty($rows)) {
            return redirect()->back()->with('error', 'No data rows were found in the uploaded file.');
        }

        [$imported, $skipped, $duplicatesInFile, $invalid] = $this->importRows($rows, $batch, $mode);

        $message = "Imported {$imported} account(s).";
        if ($skipped > 0) {
            $message .= " Skipped {$skipped} row(s) without a valid Base No.";
        }
        if ($duplicatesInFile > 0) {
            $message .= " Ignored {$duplicatesInFile} duplicate Base No(s) within the file.";
        }
        if ($invalid > 0) {
            $message .= " {$invalid} row(s) could not be saved.";
        }

        return redirect()->back()->with('success', $message);
    }

    /**
     * Persist parsed rows, mapping messy headers to clean columns.
     *
     * @return array{0:int,1:int,2:int,3:int}
     */
    private function importRows(array $rows, string $batch, string $mode): array
    {
        $imported = 0;
        $skipped = 0;
        $duplicatesInFile = 0;
        $invalid = 0;

        $seen = [];
        $now = now();

        DB::beginTransaction();

        try {
            if ($mode === 'replace') {
                Account::query()->delete();
            }

            foreach ($rows as $row) {
                $mapped = $this->mapRow($row);

                $accountNumber = trim((string) ($mapped['account_number'] ?? ''));

                // A row without a Base No (account number) cannot be validated
                // against, so it is not useful for our purpose — skip it.
                if ($accountNumber === '') {
                    $skipped++;

                    continue;
                }

                // Ignore duplicates that appear within the same file.
                $key = Str::lower($accountNumber);
                if (isset($seen[$key])) {
                    $duplicatesInFile++;

                    continue;
                }
                $seen[$key] = true;

                $mapped['account_number'] = $accountNumber;
                $mapped['import_batch'] = $batch;

                try {
                    Account::updateOrCreate(
                        ['account_number' => $accountNumber],
                        array_merge($mapped, ['updated_at' => $now])
                    );
                    $imported++;
                } catch (\Throwable $e) {
                    $invalid++;
                }
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            report($e);

            return [0, count($rows), 0, 0];
        }

        return [$imported, $skipped, $duplicatesInFile, $invalid];
    }

    /**
     * Map a raw spreadsheet row (messy keys) to clean model columns using the
     * header alias map on the Account model.
     *
     * @return array<string, string>
     */
    private function mapRow(array $row): array
    {
        $mapped = [];

        foreach ($row as $key => $value) {
            $normalized = Str::lower(trim((string) $key));
            $column = Account::HEADER_MAP[$normalized] ?? null;

            if ($column === null) {
                continue;
            }

            $mapped[$column] = Str::limit(trim(strip_tags((string) $value)), 250, '');
        }

        return $mapped;
    }

    /**
     * JSON endpoint used by the loan and KYC forms to verify an account
     * number exists in the imported member data.
     */
    public function verify(Request $request)
    {
        $request->validate([
            'account_number' => ['required', 'string'],
        ]);

        $normalized = strtolower(trim((string) $request->query('account_number')));

        $account = Account::query()
            ->whereRaw('LOWER(TRIM(account_number)) = ?', [$normalized])
            ->first();

        if (! $account) {
            return response()->json([
                'success' => false,
                'exists'  => false,
                'message' => 'This account number does not exist in our records.',
            ], 404);
        }

        // Does this account already have a loan in progress?
        $hasActiveLoan = \App\Models\loanapplication::hasActiveLoanFor($account->account_number);

        return response()->json([
            'success'         => true,
            'exists'          => true,
            'has_active_loan' => $hasActiveLoan,
            'account'         => [
                'account_number'    => $account->account_number,
                'full_name'         => $account->full_name,
                'branch'            => $account->branch,
                'membership_status' => $account->membership_status,
                'account_status'    => $account->account_status,
            ],
        ]);
    }

    /**
     * Download a CSV template with the exact expected headers.
     */
    public function template()
    {
        $headers = [
            'Branch',
            'Base No',
            'salutation',
            'FullName',
            'IDType',
            'idno',
            'Gende',
            'YEARBIRTH',
            'MaritalStatus',
            'Mobile',
            'Email',
            'entrydate',
            'Employer',
            'jobNumber',
            'Relationship Manager',
            'Membership Status',
            'Account Status',
        ];

        $sample = [
            'Lilongwe',
            'FIN-000123',
            'Mr',
            'John Banda',
            'National ID',
            'FINID123456',
            'Male',
            '1985',
            'Single',
            '+265991234567',
            'john.banda@example.com',
            '2023-01-15',
            'FINCOOP',
            'JOB-001',
            'Alice Phiri',
            'Member',
            'Active',
        ];

        $callback = function () use ($headers, $sample) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, $headers);
            fputcsv($handle, $sample);
            fclose($handle);
        };

        return response()->stream($callback, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="accounts_import_template.csv"',
        ]);
    }

    /**
     * Delete a single imported account.
     */
    public function destroy(Account $account)
    {
        $account->delete();

        return redirect()->back()->with('success', 'Account deleted successfully.');
    }
}
