<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function shippingAddress(): BelongsTo{
        return $this->belongsTo(ShippingAddress::class, 'shipping_address_id');
    }

    public function paymentMethod(): BelongsTo{
        return $this->belongsTo(PaymentMethod::class);
    } 

    public function orderItems(): HasMany{
        return $this->hasMany(OrderItem::class);
    }
}
