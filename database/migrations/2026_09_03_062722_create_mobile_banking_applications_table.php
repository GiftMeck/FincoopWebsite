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
        Schema::create('mobile_banking_applications', function (Blueprint $table) {
            $table->id();

            // Request & Customer Details
            $table->string('request_type');
            $table->string('title');
            $table->string('first_name');
            $table->string('surname');
            $table->string('id_type');
            $table->string('id_number');
            $table->string('cell_phone');
            $table->string('sacc_number_employment');
            $table->string('email')->nullable();
            $table->text('postal_address')->nullable();

            // Linked Mobile Phone
            $table->boolean('add_mobile_number')->default(false);
            $table->boolean('remove_mobile_number')->default(false);
            $table->string('mobile_1_number');
            $table->string('mobile_1_sms_notification')->nullable();
            $table->string('mobile_2_number')->nullable();
            $table->string('mobile_2_sms_notification')->nullable();

            // Services
            $table->boolean('balance_savings')->default(false);
            $table->boolean('balance_loans')->default(false);
            $table->boolean('balance_other')->default(false);
            $table->string('balance_other_specify')->nullable();
            $table->boolean('funds_transfer')->default(false);

            // Declaration
            $table->boolean('declaration_accepted')->default(false);
            $table->string('signature');
            $table->date('declaration_date');

            // Office Use Only
            $table->string('member_customer_number')->nullable();
            $table->string('received_by')->nullable();
            $table->date('received_date')->nullable();
            $table->string('approved_by')->nullable();
            $table->date('approved_date')->nullable();
            $table->string('processed_by')->nullable();
            $table->date('processed_date')->nullable();

            // Status
            $table->enum('status', ['pending', 'approved', 'rejected', 'processed'])->default('pending');

            $table->timestamps();

            // Indexes for better performance
            $table->index('request_type');
            $table->index('sacc_number_employment');
            $table->index('cell_phone');
            $table->index('status');
            $table->index(['created_at']);
        });
    }

   
    public function down(): void
    {
        Schema::dropIfExists('mobile_banking_applications');
    }
};