<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class about extends Model
{
    protected $primaryKey = 'about_id';
    protected $fillable = [
        'about_title',
        'about_description',
        'about_image',
    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_about', 'about_id', 'user_id');
    }
}
