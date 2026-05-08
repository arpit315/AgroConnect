<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Crop extends Model
{
    protected $fillable = ['farmer_id', 'crop_name', 'quantity', 'price', 'location', 'description', 'image'];

    public function farmer()
    {
        return $this->belongsTo(User::class, 'farmer_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
