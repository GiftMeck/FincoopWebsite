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
}