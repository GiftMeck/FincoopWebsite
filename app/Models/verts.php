<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class verts extends Model
{
    protected $fillable = [
        'advert_title',
        'advert_description',
        'advert_image',
        'advert_link',
    ];
}
