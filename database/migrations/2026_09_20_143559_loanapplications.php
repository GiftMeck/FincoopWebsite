<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loanapplications', function (Blueprint $table) {
            $table->id();

            $table->string('account_number')->nullable();
            $table->string('employment_number')->nullable();

            $table->string('id_type');
            $table->string('id_number');

            $table->string('surname');
            $table->string('first_names');

            $table->string('title')->nullable();
            $table->unsignedInteger('age')->nullable();

            $table->enum('gender', [
                'male',
                'female',
            ]);

            $table->string('physical_address')->nullable();
            $table->string('mailing_address')->nullable();

            $table->string('home_address')->nullable();
            $table->string('village')->nullable();
            $table->string('traditional_authority')->nullable();
            $table->string('district')->nullable();

            $table->string('email')->nullable();
            $table->string('phone_number');

            $table->enum('loanapplication_type', [
                'personal',
                'business',
                'agricultural',
                'emergency',
            ]);

            $table->decimal('loanapplication_amount', 15, 2);

            $table->text('loanapplication_amount_in_words')
                ->nullable();

            $table->text('loanapplication_purpose');

            $table->unsignedInteger(
                'repayment_period'
            );

            $table->string('employer_name')
                ->nullable();

            $table->string('job_title')
                ->nullable();

            $table->boolean('employment_verified')
                ->default(false);

            $table->string('employment_period')
                ->nullable();

            $table->text('employer_address')
                ->nullable();

            $table->string('employer_phone')
                ->nullable();

            $table->decimal(
                'gross_income',
                15,
                2
            )->nullable();

            $table->boolean('gross_income_verified')
                ->default(false);

            $table->decimal(
                'net_income',
                15,
                2
            )->nullable();

            $table->boolean('net_income_verified')
                ->default(false);

            $table->unsignedInteger(
                'years_in_business'
            )->nullable();

            $table->string(
                'business_type'
            )->nullable();

            $table->string(
                'trading_area'
            )->nullable();

            $table->string(
                'business_name'
            )->nullable();


            $table->json(
                'business_financials'
            )->nullable();

            $table->decimal(
                'shares_balance',
                15,
                2
            )->nullable();

            $table->decimal(
                'savings_balance',
                15,
                2
            )->nullable();

            $table->decimal(
                'fixed_deposit_balance',
                15,
                2
            )->nullable();

            $table->decimal(
                'existing_loanapplications_balance',
                15,
                2
            )->nullable();


            $table->json(
                'security_offered'
            )->nullable();

            $table->json(
                'liabilities'
            )->nullable();

            $table->boolean(
                'declaration_accepted'
            )->default(false);

            $table->date(
                'application_date'
            )->nullable();


            $table->enum('status', [
                'pending',
                'under_review',
                'approved',
                'rejected',
            ])->default('pending');
            $table->string('loan_recommended_by')->nullable();
            $table->string('amount_recommended')->nullable();
            $table->string('credit_officer_name')->nullable();
             $table->string('loan_officer_name')->nullable();
            $table->string('branch_manager_name')->nullable();
            $table->string('amount_approved')->nullable();
            $table->string('approval_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loanapplications');
    }
};
