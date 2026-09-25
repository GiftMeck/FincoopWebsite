<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class customer extends Model
{
    protected $fillable = [
        'customer_name',
        'customer_email',
        'customer_phone',
        'customer_message',
    ];
    public function testimonials()
    {
        return $this->hasMany(testimonial::class, 'customer_id', 'customer_id');
    }
    public function faqs()
    {
        return $this->hasMany(faq::class, 'customer_id', 'customer_id');
    }
}
