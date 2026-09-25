<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class financial_benefit extends Model
{
    protected $fillable = [
        'benefit_name',
        'benefit_description',
        'benefit_type',
        'category_id'
    ];
}
