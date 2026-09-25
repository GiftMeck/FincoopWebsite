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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id('testimonial_id')->autoIncrement();
            $table->foreignId('customer_id')->nullable()->constrained('customers', 'customer_id')->onDelete('cascade');
            $table->foreignId('partner_id')->nullable()->constrained('partners', 'partner_id')->onDelete('cascade');
            $table->string('testimonial_title');
            $table->string('testimonial_image')->nullable();
            $table->text('testimonial_content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
