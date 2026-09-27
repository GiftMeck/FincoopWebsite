<?php

namespace App\Http\Controllers;

use App\Models\loanapplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanapplicationController extends Controller
{
    public function create()
    {
        return Inertia::render(
            'Loans/Create',
        );
    }


    public function store(Request $request)
    {
        $validated = $request->validate([

            /*
            |--------------------------------------------------------------------------
            | Personal Information
            |--------------------------------------------------------------------------
            */

            'account_number' => [
                'nullable',
                'string',
                'max:255',
            ],

            'employment_number' => [
                'nullable',
                'string',
                'max:255',
            ],

            'id_type' => [
                'required',
                'string',
            ],

            'id_number' => [
                'required',
                'string',
                'max:255',
            ],

            'surname' => [
                'required',
                'string',
                'max:255',
            ],

            'first_names' => [
                'required',
                'string',
                'max:255',
            ],

            'title' => [
                'nullable',
                'string',
            ],

            'age' => [
                'nullable',
                'integer',
                'min:18',
            ],

            'gender' => [
                'required',
                'in:male,female',
            ],

            'physical_address' => [
                'nullable',
                'string',
            ],

            'mailing_address' => [
                'nullable',
                'string',
            ],

            'home_address' => [
                'nullable',
                'string',
            ],

            'village' => [
                'nullable',
                'string',
            ],

            'traditional_authority' => [
                'nullable',
                'string',
            ],

            'district' => [
                'nullable',
                'string',
            ],

            'email' => [
                'nullable',
                'email',
            ],

            'phone_number' => [
                'required',
                'string',
                'max:30',
            ],


            /*
            |--------------------------------------------------------------------------
            | loanapplication Information
            |--------------------------------------------------------------------------
            */

            'loanapplication_type' => [
                'required',
                'in:personal,business,agricultural,emergency',
            ],

            'loanapplication_amount' => [
                'required',
                'numeric',
                'min:1',
            ],

            'loanapplication_amount_in_words' => [
                'nullable',
                'string',
            ],

            'loanapplication_purpose' => [
                'required',
                'string',
            ],

            'repayment_period' => [
                'required',
                'integer',
                'min:1',
            ],


            /*
            |--------------------------------------------------------------------------
            | Employment
            |--------------------------------------------------------------------------
            */

            'employer_name' => [
                'nullable',
                'string',
            ],

            'job_title' => [
                'nullable',
                'string',
            ],

            'employment_verified' => [
                'boolean',
            ],

            'employment_period' => [
                'nullable',
                'string',
            ],

            'employer_address' => [
                'nullable',
                'string',
            ],

            'employer_phone' => [
                'nullable',
                'string',
            ],

            'gross_income' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'gross_income_verified' => [
                'boolean',
            ],

            'net_income' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'net_income_verified' => [
                'boolean',
            ],


            /*
            |--------------------------------------------------------------------------
            | Business
            |--------------------------------------------------------------------------
            */

            'years_in_business' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'business_type' => [
                'nullable',
                'string',
            ],

            'trading_area' => [
                'nullable',
                'string',
            ],

            'business_name' => [
                'nullable',
                'string',
            ],

            'business_financials' => [
                'nullable',
                'array',
            ],


            /*
            |--------------------------------------------------------------------------
            | Financial Information
            |--------------------------------------------------------------------------
            */

            'shares_balance' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'savings_balance' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'fixed_deposit_balance' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'existing_loanapplications_balance' => [
                'nullable',
                'numeric',
                'min:0',
            ],


            /*
            |--------------------------------------------------------------------------
            | Security
            |--------------------------------------------------------------------------
            */

            'security_offered' => [
                'nullable',
                'array',
            ],

            'liabilities' => [
                'nullable',
                'array',
            ],


            /*
            |--------------------------------------------------------------------------
            | Declaration
            |--------------------------------------------------------------------------
            */

            'declaration_accepted' => [
                'accepted',
            ],

            'application_date' => [
                'nullable',
                'date',
            ],
        ]);


        $loanapplication = loanapplication::create(
            $validated
        );


        return redirect()
            ->route('loanapplications.show', $loanapplication->id)
            ->with(
                'success',
                'loanapplication application submitted successfully.'
            );
    }


    public function show(loanapplication $loanApplicant)
    {
        return Inertia::render(
            'Loans/Show',
            [
                'loanApplicant' => $loanApplicant,
            ]
        );
    }
    public function approve(Request $request, loanapplication $loanApplicant)
    {
        $validated = $request->validate([
            // Employment verification
            'employment_verified' => 'boolean',
            'gross_income_verified' => 'boolean',
            'net_income_verified' => 'boolean',

            // Recommendation
            'loan_recommended_by' => 'nullable|string|max:255',
            'amount_recommended' => 'nullable|numeric|min:0',

            // Credit officer
            'credit_officer_name' => 'nullable|string|max:255',

            // Branch manager
            'branch_manager_name' => 'nullable|string|max:255',

            // Credit committee
            'amount_approved' => 'nullable|numeric|min:0',
            'denial_reason' => 'nullable|string',
            'approval_date' => 'nullable|date',
        ]);

        $validated['status'] = 'approved';
        $validated['approval_date'] = $validated['approval_date'] ?? now()->toDateString();

        $loanApplicant->update($validated);

        return redirect()
            ->back()
            ->with('success', 'Loan application approved successfully.');
    }
    public function export(Request $request)
    {
        $LoanRecords = loanapplication::all();
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="loan_records_' . date('Y-m-d') . '.csv"',
        ];

        $callback = function () use ($LoanRecords) {
            $handle = fopen('php://output', 'w');

            // Headers
            fputcsv($handle, [
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
            ]);

            // Data
            foreach ($LoanRecords as $LoanRecord) {
                fputcsv($handle, [
                $LoanRecord->account_number ?? 'N/A',
                $LoanRecord->employment_number?? 'N/A',
                $LoanRecord->id_type ?? 'N/A',
                $LoanRecord->id_number ?? 'N/A',
                $LoanRecord->surname ?? 'N/A',
                $LoanRecord->first_names ?? 'N/A',
                $LoanRecord->title ?? 'N/A',
                $LoanRecord->age ?? 'N/A',
                $LoanRecord->gender ?? 'N/A',
                $LoanRecord->physical_address ?? 'N/A',
                $LoanRecord->mailing_address ?? 'N/A',
                $LoanRecord->home_address ?? 'N/A',
                $LoanRecord->village ?? 'N/A',
                $LoanRecord->traditional_authority ?? 'N/A',
                $LoanRecord->district ?? 'N/A',
                $LoanRecord->email ?? 'N/A',
                $LoanRecord->phone_number ?? 'N/A',

                // Loan
                $LoanRecord->loanapplication_type ?? 'N/A',
                $LoanRecord->loanapplication_amount ?? 'N/A',
                $LoanRecord->loanapplication_amount_in_words ?? 'N/A',
                $LoanRecord->loanapplication_purpose ?? 'N/A',
                $LoanRecord->repayment_period ?? 'N/A',

                // Employment
                $LoanRecord->employer_name ?? 'N/A',
                $LoanRecord->job_title ?? 'N/A',
                $LoanRecord->employment_verified ? 'Verified' : 'Not Verified' ?? 'N/A',
                $LoanRecord->employment_period ?? 'N/A',
                $LoanRecord->employer_address ?? 'N/A',
                $LoanRecord->employer_phone ?? 'N/A',
                $LoanRecord->gross_income ?? 'N/A',
                $LoanRecord->gross_income_verified ? 'Verified' : 'Not Verified' ?? 'N/A',
                $LoanRecord->net_income ?? 'N/A',
                $LoanRecord->net_income_verified ? 'Verified' : 'Not Verified' ?? 'N/A',

                // Business
                $LoanRecord->years_in_business ?? 'N/A',
                $LoanRecord->business_type ?? 'N/A',
                $LoanRecord->trading_area ?? 'N/A',
                $LoanRecord->business_name ?? 'N/A',
                $LoanRecord->business_financials ?? 'N/A',

                // Financial
                $LoanRecord->shares_balance ?? 'N/A',
                $LoanRecord->savings_balance ?? 'N/A',
                $LoanRecord->fixed_deposit_balance ?? 'N/A',
                $LoanRecord->existing_loanapplications_balance ?? 'N/A',

                // Security & Liabilities
                $LoanRecord->security_offered ?? 'N/A',
                $LoanRecord->liabilities ?? 'N/A',

                // Declaration
                $LoanRecord->declaration_accepted ? 'Accepted' : 'Not Accepted' ?? 'N/A',
                $LoanRecord->application_date ?? 'N/A',

                // Official Use / Approval
                $LoanRecord->status ?? 'N/A',
                $LoanRecord->loan_recommended_by ?? 'N/A',
                $LoanRecord->amount_recommended ?? 'N/A',
                $LoanRecord->credit_officer_name ?? 'N/A',
                $LoanRecord->credit_officer_signature_date ?? 'N/A',
                $LoanRecord->branch_manager_name ?? 'N/A',
                $LoanRecord->amount_approved ?? 'N/A',
                $LoanRecord->denial_reason ?? 'N/A',
                $LoanRecord->approval_date ?? 'N/A',
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }

}
