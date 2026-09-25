<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class branch extends Model
{
    protected $fillable = [
        'branch_name',
        'branch_address',
        'branch_phone',
        'branch_email',
        'social_media_links'
    ];
    public function galleries()
    {
        return $this->hasMany(gallery::class, 'branch_id', 'branch_id');
    }
    public function contacts()
    {
        return $this->hasMany(contact::class, 'branch_id', 'branch_id');
    }
}
