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
        Schema::create('group_memberships', function (Blueprint $table) {
            $table->id();

            // Group Details
            $table->string('group_name');
            $table->integer('number_of_members_male')->nullable();
            $table->integer('number_of_members_female')->nullable();
            $table->integer('number_of_members_total')->nullable();
            $table->date('date_of_registration')->nullable();
            $table->string('registration_number')->nullable();
            $table->string('registered_under')->nullable();
            $table->string('business_type')->nullable();
            $table->string('income_source')->nullable();
            $table->string('place_of_operation')->nullable();
            $table->string('trading_area')->nullable();

            // Contact Person / Group Representatives
            // Representative 1
            $table->string('rep1_full_name')->nullable();
            $table->string('rep1_id_number')->nullable();
            $table->string('rep1_position')->nullable();
            $table->string('rep1_telephone')->nullable();

            // Representative 2
            $table->string('rep2_full_name')->nullable();
            $table->string('rep2_id_number')->nullable();
            $table->string('rep2_position')->nullable();
            $table->string('rep2_telephone')->nullable();

            // Representative 3
            $table->string('rep3_full_name')->nullable();
            $table->string('rep3_id_number')->nullable();
            $table->string('rep3_position')->nullable();
            $table->string('rep3_telephone')->nullable();

            // Group Address
            $table->text('group_mailing_address')->nullable();
            $table->text('group_physical_address')->nullable();

            // Recommendation
            $table->string('recommendation_centre_name')->nullable();
            $table->date('recommendation_date')->nullable();

            // Leader 1
            $table->string('leader1_name')->nullable();
            $table->string('leader1_signature')->nullable();
            $table->string('leader1_position')->nullable();

            // Leader 2
            $table->string('leader2_name')->nullable();
            $table->string('leader2_signature')->nullable();
            $table->string('leader2_position')->nullable();

            // Leader 3
            $table->string('leader3_name')->nullable();
            $table->string('leader3_signature')->nullable();
            $table->string('leader3_position')->nullable();

            // Declaration
            $table->boolean('declaration_accepted')->default(false);
            $table->string('chairperson_signature');
            $table->string('secretary_signature');
            $table->string('treasurer_signature');
            $table->date('application_date');

            // Official Use Only
            $table->text('cross_checked_comments')->nullable();
            $table->date('entrance_fee_paid_on')->nullable();
            $table->decimal('entrance_fee_amount', 15, 2)->nullable();
            $table->string('receipt_number')->nullable();
            $table->string('completed_by')->nullable();
            $table->date('completed_date')->nullable();
            $table->date('date_of_admission')->nullable();
            $table->string('member_identification_number')->nullable()->unique();
            $table->string('approved_disapproved_by')->nullable();
            $table->string('branch_manager')->nullable();
            $table->string('official_signature')->nullable();
            $table->date('official_date')->nullable();

            // Status
            $table->enum('status', ['pending', 'approved', 'disapproved'])->default('pending');

            $table->timestamps();

            // Indexes for better performance
            $table->index('group_name');
            $table->index('registration_number');
            $table->index('member_identification_number');
            $table->index('status');
            $table->index(['created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('group_memberships');
    }
};