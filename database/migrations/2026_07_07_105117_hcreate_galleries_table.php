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
        Schema::create('galleries', function (Blueprint $table) {
            $table->id('gallery_id')->autoIncrement();
            $table->foreignId('branch_id')->nullable()->constrained('branches', 'branch_id')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users', 'id')->onDelete('cascade');
            $table->foreignId('service_id')->nullable()->constrained('services', 'service_id')->onDelete('cascade');
            $table->foreignId('partner_id')->nullable()->constrained('partners', 'partner_id')->onDelete('cascade');
            $table->string('gallery_title');
            $table->text('gallery_description')->nullable();
            $table->string('gallery_image')->nullable();
            $table->string('gallery_video')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galleries');
    }
};
