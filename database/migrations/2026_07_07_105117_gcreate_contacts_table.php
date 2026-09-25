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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id('contact_id')->autoIncrement();
            $table->foreignId('branch_id')->nullable()->constrained('branches', 'branch_id')->onDelete('cascade');
            $table->foreignId('partner_id')->nullable()->constrained('partners', 'partner_id')->onDelete('cascade');
            $table->string('contact_number')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_physical_address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
