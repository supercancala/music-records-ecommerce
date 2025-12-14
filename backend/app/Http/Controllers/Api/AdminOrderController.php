<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class AdminOrderController extends Controller
{
    public function index(Request $request){
        if (!$request->user()->is_admin){
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return Order::with(['user', 'items'])->latest()->get();
    }

    public function updateStatus(Request $request, $id){
        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,shipped,completed,cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->update(['status' => $validated['status']]);

        return response()->json(['message' => 'Status updated successfully']);    
    }
}
