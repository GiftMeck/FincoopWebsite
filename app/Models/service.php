<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class service extends Model
{
    protected $table = 'services';
    protected $primaryKey = 'service_id';
    protected $fillable = [
        'service_name',
        'service_description',
        'category_id',
        'branch_id',
        'service_image'
    ];
    public function serviceCategory()
    {
        return $this->belongsTo(serviceCategory::class, 'category_id', 'category_id');
    }
    public function galleries()
    {
        return $this->hasMany(gallery::class, 'service_id', 'service_id');
    }
    public function branch(){
        return $this->belongsTo(branch::class, 'branch_id', 'branch_id');
    }
}
