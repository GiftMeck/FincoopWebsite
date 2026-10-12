<?php

namespace Tests\Feature;

use App\Models\Account;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AccountValidationEnforcementTest extends TestCase
{
    use DatabaseTransactions;

    public function test_loan_application_rejects_unknown_account_number(): void
    {
        $payload = $this->loanPayload();
        $payload['account_number'] = 'FIN-DOES-NOT-EXIST';

        $response = $this->post('/loanapplications', $payload);

        $response->assertSessionHasErrors('account_number');
    }

    public function test_loan_application_accepts_known_account_number(): void
    {
        Account::create(['account_number' => 'FIN-KNOWN', 'full_name' => 'Valid Member']);

        $payload = $this->loanPayload();
        $payload['account_number'] = 'FIN-KNOWN';

        // A known account should pass the account_number rule (no error on that key).
        $response = $this->post('/loanapplications', $payload);

        $this->assertFalse(
            session()->has('errors') && session('errors')->has('account_number'),
            'account_number should be valid for a known account.'
        );
    }

    public function test_loan_application_requires_account_number(): void
    {
        $payload = $this->loanPayload();
        $payload['account_number'] = '';

        $this->post('/loanapplications', $payload)
            ->assertSessionHasErrors('account_number');
    }

    public function test_kyc_submission_rejects_unknown_member_sacco_number(): void
    {
        $payload = $this->kycPayload();
        $payload['member_sacco_number'] = 'FIN-UNKNOWN-KYC';

        $this->post('/kyc', $payload)
            ->assertStatus(422)
            ->assertJsonValidationErrors('member_sacco_number');
    }

    public function test_kyc_submission_accepts_known_member_sacco_number(): void
    {
        Account::create(['account_number' => 'FIN-KYC-KNOWN', 'full_name' => 'KYC Member']);

        $payload = $this->kycPayload();
        $payload['member_sacco_number'] = 'FIN-KYC-KNOWN';

        $response = $this->post('/kyc', $payload);

        $this->assertNotSame(422, $response->getStatusCode(), 'Known account should not fail KYC validation.');
    }

    private function loanPayload(): array
    {
        return [
            'account_number' => 'FIN-DEFAULT',
            'employment_number' => 'EMP-1',
            'id_type' => 'national_id',
            'id_number' => 'ID123',
            'surname' => 'Banda',
            'first_names' => 'John',
            'title' => 'Mr',
            'age' => 30,
            'gender' => 'male',
            'physical_address' => 'Area 1',
            'mailing_address' => 'PO Box 1',
            'home_address' => 'Home 1',
            'village' => 'Village 1',
            'traditional_authority' => 'TA 1',
            'district' => 'Lilongwe',
            'email' => 'john@example.com',
            'phone_number' => '+265991112233',
            'loanapplication_type' => 'personal',
            'loanapplication_amount' => 100000,
            'loanapplication_amount_in_words' => 'One hundred thousand',
            'loanapplication_purpose' => 'Business expansion purposes',
            'repayment_period' => 12,
            'employer_name' => 'FINCOOP',
            'job_title' => 'Officer',
            'employment_verified' => false,
            'employment_period' => '2 years',
            'employer_address' => 'Lilongwe',
            'employer_phone' => '+265881122334',
            'gross_income' => 500000,
            'gross_income_verified' => false,
            'net_income' => 350000,
            'net_income_verified' => false,
            'years_in_business' => 3,
            'business_type' => 'retail',
            'trading_area' => 'Lilongwe',
            'business_name' => 'JB Traders',
            'shares_balance' => 50000,
            'savings_balance' => 200000,
            'fixed_deposit_balance' => 0,
            'existing_loanapplications_balance' => 0,
            'declaration_accepted' => true,
            'application_date' => '2026-01-01',
        ];
    }

    private function kycPayload(): array
    {
        return [
            'member_sacco_number' => 'FIN-DEFAULT-KYC',
            'member_phone_number' => '+265991112233',
            'id_type' => 'national_id',
            'id_number' => 'IDKYC123',
            'surname' => 'Phiri',
            'first_names' => 'Mary',
            'date_of_birth' => '1990-05-01',
            'gender' => 'female',
            'physical_address' => 'Area 2',
            'mailing_address' => 'PO Box 2',
            'home_address' => 'Home 2',
            'village' => 'Village 2',
            'traditional_authority' => 'TA 2',
            'district' => 'Blantyre',
            'email' => 'mary@example.com',
            'referee_name' => 'Ref One',
            'referee_occupation' => 'Teacher',
            'referee_address' => 'Blantyre',
            'referee_phone' => '+265881122334',
            'declaration_accepted' => true,
        ];
    }
}
