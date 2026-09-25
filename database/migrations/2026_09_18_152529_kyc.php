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
        Schema::create('kyc', function (Blueprint $table) {
            $table->id();

            // Personal Details
            $table->string('member_sacco_number')->nullable();
            $table->string('member_phone_number');
            $table->string('id_type');
            $table->string('id_number');
            $table->string('surname');
            $table->string('first_names');
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->text('physical_address')->nullable();
            $table->text('mailing_address')->nullable();
            $table->text('home_address')->nullable();
            $table->string('village')->nullable();
            $table->string('traditional_authority')->nullable();
            $table->string('district')->nullable();
            $table->string('email')->nullable();

            // Referees
            $table->string('referee_name')->nullable();
            $table->string('referee_occupation')->nullable();
            $table->text('referee_address')->nullable();
            $table->string('referee_phone')->nullable();

            // Declaration
            $table->boolean('declaration_accepted')->default(false);

            // Official Use Only
            $table->text('cross_checked_comments')->nullable();
            $table->string('completed_by')->nullable();
            $table->date('date_completed')->nullable();
            $table->date('date_kyc_update')->nullable();
            $table->string('kyc_identification_number')->nullable()->unique();
            $table->string('approved_by')->nullable();
            $table->string('branch_manager_name')->nullable();
            $table->date('approval_date')->nullable();
            $table->enum('approval_status', ['pending', 'approved', 'disapproved'])->default('pending')->nullable();

            // KYC specific fields
            $table->enum('kyc_status', ['pending', 'verified', 'rejected', 'expired'])->default('pending')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->text('verification_notes')->nullable();

            $table->timestamps();

            // Indexes for better performance
            $table->index('member_sacco_number');
            $table->index('member_phone_number');
            $table->index('id_number');
            $table->index('surname');
            $table->index('approval_status');
            $table->index('kyc_status');
            $table->index(['created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kyc');
    }
};