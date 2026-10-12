<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Stores the member/account master data imported from the Excel sheet.
     * The "Base No" column from the source file is stored as `account_number`
     * and is the value validated against when members apply for loans or
     * update their KYC.
     */
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();

            // Source of truth used for loan / KYC account-number validation.
            $table->string('account_number')->unique();

            // Remaining columns (cleaned-up names mapped from the Excel file).
            $table->string('branch')->nullable();
            $table->string('salutation')->nullable();
            $table->string('full_name')->nullable();
            $table->string('id_type')->nullable();
            $table->string('id_number')->nullable();
            $table->string('gender')->nullable();
            $table->string('year_of_birth')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('mobile')->nullable();
            $table->string('email')->nullable();
            $table->string('entry_date')->nullable();
            $table->string('employer')->nullable();
            $table->string('job_number')->nullable();
            $table->string('relationship_manager')->nullable();
            $table->string('membership_status')->nullable();
            $table->string('account_status')->nullable();

            // Tracks which import batch a row came from (for auditing/rollback).
            $table->uuid('import_batch')->nullable();

            $table->timestamps();

            // Indexes for faster validation lookups.
            $table->index('account_number');
            $table->index('full_name');
            $table->index('id_number');
            $table->index('membership_status');
            $table->index('account_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
