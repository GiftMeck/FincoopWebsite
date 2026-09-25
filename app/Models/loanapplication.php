<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoanApplication extends Model
{
    protected $table = 'loanapplications';
    protected $fillable = [
    // Personal
    'account_number',
    'employment_number',
    'id_type',
    'id_number',
    'surname',
    'first_names',
    'title',
    'age',
    'gender',
    'physical_address',
    'mailing_address',
    'home_address',
    'village',
    'traditional_authority',
    'district',
    'email',
    'phone_number',

    // Loan
    'loanapplication_type',
    'loanapplication_amount',
    'loanapplication_amount_in_words',
    'loanapplication_purpose',
    'repayment_period',

    // Employment
    'employer_name',
    'job_title',
    'employment_verified',
    'employment_period',
    'employer_address',
    'employer_phone',
    'gross_income',
    'gross_income_verified',
    'net_income',
    'net_income_verified',

    // Business
    'years_in_business',
    'business_type',
    'trading_area',
    'business_name',
    'business_financials',

    // Financial
    'shares_balance',
    'savings_balance',
    'fixed_deposit_balance',
    'existing_loanapplications_balance', // ← fixed name

    // Security & Liabilities
    'security_offered',
    'liabilities',

    // Declaration
    'declaration_accepted',
    'application_date',

    // Official Use / Approval
    'status',
    'loan_recommended_by',
    'amount_recommended',
    'credit_officer_name',
    'credit_officer_signature_date',
    'branch_manager_name',
    'amount_approved',
    'denial_reason',
    'approval_date',
];
    protected function casts(): array
    {
        return [
            'employment_verified' => 'boolean',
            'gross_income_verified' => 'boolean',
            'net_income_verified' => 'boolean',
            'declaration_accepted' => 'boolean',

            'business_financials' => 'array',
            'security_offered' => 'array',
            'liabilities' => 'array',
        ];
    }
}