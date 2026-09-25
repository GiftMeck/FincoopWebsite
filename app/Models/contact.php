<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class contact extends Model
{
    protected $fillable = [
        'contact_number',
        'contact_email',
        'contact_physical_address',
        'branch_id',
        'partner_id'
    ];
    public function branch()
    {
        return $this->belongsTo(branch::class, 'branch_id', 'branch_id');
    }
    public function partner()
    {
        return $this->belongsTo(partner::class, 'partner_id', 'partner_id');
    }
}
