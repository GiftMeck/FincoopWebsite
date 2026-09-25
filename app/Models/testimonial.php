<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class testimonial extends Model
{
    protected $primaryKey = 'testimonial_id';
    protected $fillable = [
        'testimonial_title',
        'testimonial_content',
        'partner_id',
        'customer_id',
        'testimonial_image',
    ];
    public function customer()
    {
        return $this->belongsTo(customer::class, 'customer_id', 'customer_id');
    }
   public function galleries()
    {
        return $this->belongsToMany(gallery::class, 'testimonial_gallery', 'testimonial_id', 'gallery_id');
    }
}
