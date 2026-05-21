<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Requirement extends Model
{
    protected $fillable = ['vendor_id', 'crop_name', 'quantity', 'budget', 'location', 'description'];

    public function vendor()
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }
}
