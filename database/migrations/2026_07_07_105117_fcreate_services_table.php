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
        Schema::create('services', function (Blueprint $table) {
            $table->id('service_id')->autoIncrement();
            $table->foreignId('category_id')->nullable()->constrained('service_categories', 'category_id')->onDelete('cascade');
            $table->foreignId('branch_id')->nullable()->constrained('branches', 'branch_id')->onDelete('cascade');
            $table->string('service_name');
            $table->text('service_description')->nullable();
            $table->string('service_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
