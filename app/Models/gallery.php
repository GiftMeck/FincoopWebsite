<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class gallery extends Model
{
    protected $fillable = [
                'gallery_title',
                'gallery_description',
                'branch_id',
                'user_id',
                'service_id',
                'partner_id',
                'gallery_image',
                'gallery_video'
            ];  
    protected $primaryKey = 'gallery_id';
    public function testimonials()
    {
        return $this->belongsToMany(testimonial::class, 'gallery_testimonial', 'gallery_id', 'testimonial_id');
    }
    public function branches()
    {
        return $this->belongsTo(branch::class, 'branch_id', 'branch_id');
    }
    public function users()
    {
        return $this->belongsTo(user::class, 'user_id', 'id');
    }
    public function services()
    {
        return $this->belongsTo(service::class, 'service_id', 'service_id');
    }
    public function partners()
    {
        return $this->belongsTo(partner::class, 'partner_id', 'partner_id');
    }
}