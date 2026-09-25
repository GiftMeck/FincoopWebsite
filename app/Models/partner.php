<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class partner extends Model
{
    protected $primaryKey = 'partner_id';
    protected $fillable = [
        'partner_name',
        'partner_logo',
        'partner_description'
    ];  
    public function galleries()
    {
        return $this->belongsToMany(Gallery::class, 'gallery_partner', 'partner_id', 'gallery_id');
    }
    public function contacts()
    {
        return $this->hasMany(Contact::class, 'partner_id', 'partner_id');
    }
}
