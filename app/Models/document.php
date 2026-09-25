<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class document extends Model
{
    protected $primaryKey = 'document_id';
    protected $fillable = [
        'document_name',
        'document_type',
        'document_path',
        'document_status',
        'document_owner',
        'document_description',
    ];

    protected $table = 'documents';

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $attributes = [
        'document_status' => 'active',
        'document_owner' => 'admin',
    ];

    protected $guarded = [
        'id',
        'created_at'
    ];
}
