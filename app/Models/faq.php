<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class faq extends Model
{
    protected $table = 'faqs';
    protected $primaryKey = 'faq_id';
    protected $fillable = [
        'faq_question',
        'faq_answer',
        'question_owner_id',
        'answer_owner_id',
        'demo_photo'
    ];
    public function staff()
    {
        return $this->belongsTo(user::class, 'staff_id', 'id');
    }
    public function customer()
    {
        return $this->belongsTo(customer::class, 'customer_id', 'customer_id');
    }
}
