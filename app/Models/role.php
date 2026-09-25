<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class role extends Model
{
    protected $fillable = [
        'role_name'
    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_roles', 'role_id', 'user_id');
    }
}
