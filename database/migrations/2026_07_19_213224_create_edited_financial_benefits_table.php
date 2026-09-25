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
        Schema::create('financial_benefits', function (Blueprint $table) {
            $table->id('benefit_id');
            $table->foreignId('category_id')->nullable()->constrained('service_categories', 'category_id')->onDelete('cascade')->onUpdate('cascade');
            $table->string('benefit_name');
            $table->string('benefit_description')->nullable();
            $table->string('benefit_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_benefits');
    }
};
