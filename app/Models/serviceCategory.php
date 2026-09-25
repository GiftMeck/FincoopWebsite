<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class serviceCategory extends Model
{
    public $timestamps = false;
    protected $table = 'service_categories';
    protected $primaryKey = 'category_id';
    protected $fillable = [
        'category_name',
        'category_description',
        'category_image',
    ];
    public function services()
    {
        return $this->hasMany(Service::class, 'category_id', 'category_id');
    }
}
