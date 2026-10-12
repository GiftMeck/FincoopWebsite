<?php

require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Account;
use App\Services\ExcelReader;

// Test the full import path (reader + mapRow + importRows) via reflection.
$controller = app(App\Http\Controllers\AccountController::class);

$csv = sys_get_temp_dir() . '/upload_test.csv';
$lines = [
    'Branch,Base No,salutation,FullName,IDType,idno,Gende,YEARBIRTH,MaritalStatus,Mobile,Email,entrydate,Employer,jobNumber,Relationship Manager,Membership Status,Account Status',
    'Lilongwe,FIN-100001,Mr,Alice Banda,National ID,ID100001,Female,1990,Single,+265991000001,alice@example.com,2024-01-01,FINCOOP,J100,RM One,Member,Active',
    'Blantyre,FIN-100002,Mr,Bob Chima,National ID,ID100002,Male,1988,Married,+265991000002,bob@example.com,2024-02-01,FINCOOP,J101,RM Two,Member,Active',
    'Mzuzu,,Mr,No BaseNo,National ID,ID100003,Male,1995,Single,+265991000003,none@example.com,2024-03-01,FINCOOP,J102,RM Three,Member,Active',
    'Lilongwe,FIN-100001,Mr,Duplicate,National ID,ID100004,Male,1990,Single,+265991000004,dup@example.com,2024-01-01,FINCOOP,J103,RM Four,Member,Active', // dup Base No
];
file_put_contents($csv, implode("\n", $lines) . "\n");

$reader = new ExcelReader();
$rows = $reader->read($csv, 'upload_test.csv');
echo 'Reader rows: ' . count($rows) . ' errors: ' . json_encode($reader->errors()) . PHP_EOL;

// Clean slate for a predictable count
Account::query()->delete();

// Call private importRows via reflection (mode = append)
$method = new ReflectionMethod($controller, 'importRows');
$method->setAccessible(true);
[$imported, $skipped, $dups, $invalid] = $method->invoke($controller, $rows, 'test-batch-123', 'append');

echo "imported=$imported skipped=$skipped duplicatesInFile=$dups invalid=$invalid" . PHP_EOL;
echo 'DB count: ' . Account::count() . PHP_EOL;
foreach (Account::orderBy('account_number')->get() as $a) {
    echo '  - ' . $a->account_number . ' | ' . $a->full_name . ' | ' . $a->gender . ' | ' . $a->membership_status . PHP_EOL;
}

// Verify the exists validation rule rejects unknown account numbers.
$validator = Illuminate\Support\Facades\Validator::make(
    ['account_number' => 'FIN-999999'],
    ['account_number' => 'required|string|exists:accounts,account_number']
);
echo 'unknown account fails: ' . ($validator->fails() ? 'YES' : 'NO') . PHP_EOL;

$validator2 = Illuminate\Support\Facades\Validator::make(
    ['account_number' => 'FIN-100001'],
    ['account_number' => 'required|string|exists:accounts,account_number']
);
echo 'known account passes: ' . ($validator2->fails() ? 'NO' : 'YES') . PHP_EOL;

@unlink($csv);
