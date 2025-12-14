<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// 👇 IMPORTS MUST BE HERE (Outside the class)
use App\Models\Item;
use App\Models\Order;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->orders()
                        ->with('items') 
                        ->latest()
                        ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'shipping_address_id' => 'required|exists:shipping_addresses,id',
            'payment_method_id'   => 'required|exists:payment_methods,id',
            'items'               => 'required|array',
            'items.*.id'          => 'required|exists:items,id',
            'items.*.quantity'    => 'required|integer|min:1',
        ]);

        $totalPrice = 0;
        $orderItemsData = [];

        foreach ($validated['items'] as $cartItem) {
            $item = Item::find($cartItem['id']);
            $totalPrice += $item->price * $cartItem['quantity'];

            $orderItemsData[] = [
                'item_id'  => $item->id,
                'quantity' => $cartItem['quantity'],
                'price'    => $item->price,
            ];
        }

        $order = $request->user()->orders()->create([
            'status'              => 'pending',
            'shipping_address_id' => $validated['shipping_address_id'],
            'payment_method_id'   => $validated['payment_method_id'],
        ]);

        $order->items()->createMany($orderItemsData);

        return response()->json(['message' => 'Order placed!', 'order_id' => $order->id], 201);
    }
}