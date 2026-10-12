<?php

require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Account;

// Clean slate
Account::query()->delete();

// Seed directly via model (simulating a successful import)
$data = [
    ['FIN-000123', 'Lilongwe', 'John Banda', 'Member', 'Active'],
    ['FIN-000456', 'Blantyre', 'Mary Phiri', 'Member', 'Active'],
    ['FIN-000789', 'Mzuzu', 'Peter Mwale', 'Member', 'Inactive'],
];
foreach ($data as $d) {
    Account::create([
        'account_number' => $d[0],
        'branch' => $d[1],
        'full_name' => $d[2],
        'membership_status' => $d[3],
        'account_status' => $d[4],
    ]);
}
echo 'Seeded ' . Account::count() . ' accounts' . PHP_EOL;

// Test existsForAccountNumber (case-insensitive + trim)
foreach (['FIN-000123', ' fin-000123 ', 'FIN-999999', ''] as $n) {
    echo 'exists("' . $n . '") = ' . (Account::existsForAccountNumber($n) ? 'YES' : 'NO') . PHP_EOL;
}
