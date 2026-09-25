<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
     public function up(): void
    {
        Schema::create('faqs', function (Blueprint $table) {
            $table->id('faq_id')->autoIncrement();
            $table->foreignId('question_owner_id')->nullable()->constrained('customers', 'customer_id')->onDelete('cascade');
            $table->foreignId('answer_owner_id')->nullable()->constrained('users', 'id')->onDelete('cascade');
            $table->string('faq_question')->nullable();
            $table->text('faq_answer')->nullable();
            $table->string('demo_photo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faqs');
    }
};
