<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('memberships', function (Blueprint $table) {
            $table->id('membership_id');

            // Personal Details
            $table->string('title')->nullable();
            $table->string('surname');
            $table->string('first_name');
            $table->string('additional_name')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->string('nationality')->nullable();
            $table->enum('marital_status', ['married', 'divorced', 'single', 'widow', 'widower'])->nullable();
            $table->string('id_type')->nullable();
            $table->string('id_number')->nullable();
            $table->string('income_source')->nullable();
            $table->string('occupation')->nullable();
            $table->string('qualification')->nullable();
            $table->integer('number_of_dependants')->nullable();

            // Address / Contact
            $table->string('village')->nullable();
            $table->string('traditional_authority')->nullable();
            $table->string('district')->nullable();
            $table->text('physical_address')->nullable();
            $table->text('mailing_address')->nullable();
            $table->string('telephone')->nullable();
            $table->string('cell_phone');
            $table->string('email')->nullable();

            // Employment
            $table->string('employer_name')->nullable();
            $table->text('employer_address')->nullable();
            $table->string('employer_telephone')->nullable();
            $table->string('employer_fax_number')->nullable();

            // Monthly Deduction
            $table->string('employment_number')->nullable();
            $table->decimal('monthly_shares', 15, 2)->nullable();
            $table->decimal('monthly_savings_ps', 15, 2)->nullable();

            // Beneficiaries / Nominees
            $table->string('beneficiary_1_name')->nullable();
            $table->string('beneficiary_1_relationship')->nullable();
            $table->string('beneficiary_1_birth_date_percentage')->nullable();

            $table->string('beneficiary_2_name')->nullable();
            $table->string('beneficiary_2_relationship')->nullable();
            $table->string('beneficiary_2_birth_date_percentage')->nullable();

            $table->string('beneficiary_3_name')->nullable();
            $table->string('beneficiary_3_relationship')->nullable();
            $table->string('beneficiary_3_birth_date_percentage')->nullable();

            // Referees
            $table->string('referee_name')->nullable();
            $table->string('referee_occupation')->nullable();
            $table->text('referee_address')->nullable();
            $table->string('referee_phone_number')->nullable();

            // Declaration
            $table->boolean('declaration_accepted')->default(false);
            $table->string('applicant_signature')->nullable();
            $table->string('thumb_print')->nullable();
            $table->date('application_date')->nullable();

            // Official Use Only
            $table->date('entrance_fee_paid_on')->nullable();
            $table->decimal('entrance_fee_amount', 15, 2)->nullable();
            $table->string('receipt_number')->nullable();
            $table->string('completed_by')->nullable();
            $table->date('completed_date')->nullable();
            $table->date('date_of_admission')->nullable();
            $table->string('member_identification_number')->nullable();
            $table->string('approved_disapproved_by')->nullable();
            $table->string('branch_manager')->nullable();
            $table->string('official_signature')->nullable();
            $table->date('official_date')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('memberships');
    }
};