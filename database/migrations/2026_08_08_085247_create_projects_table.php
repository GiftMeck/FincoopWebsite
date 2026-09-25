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
        Schema::create('projects', function (Blueprint $table) {
            $table->id('project_id')->autoIncrement();
            $table->string('project_name');
            $table->string('project_description')->nullable();
            $table->string('project_status')->default('Not Started');
            $table->string('project_start_date')->nullable();
            $table->string('project_end_date')->nullable();
            $table->string('project_budget')->nullable();
            $table->string('project_photo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
