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
        Schema::create('verts', function (Blueprint $table) {
            $table->id('advert_id')->autoIncrement();
            $table->string('advert_title');
            $table->text('advert_description')->nullable();
            $table->string('advert_image')->nullable();
            $table->string('advert_link')->nullable();
            $table->boolean('advert_active')->default(1);
            $table->string('advert_type')->default('banner');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verts');
    }
};
