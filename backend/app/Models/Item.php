<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    use HasFactory;

    public function genres(){
        return $this->belongsToMany(Genre::class, 'item_genres');
    }

    public function artists(){
        return $this->belongsToMany(Artist::class, 'item_artists');
    }

    public function orderItems() : HasMany{
        return $this->hasMany(OrderItem::class);
    }
}
