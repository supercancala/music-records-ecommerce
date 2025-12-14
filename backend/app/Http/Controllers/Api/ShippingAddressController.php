<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ShippingAddress;

class ShippingAddressController extends Controller
{
    public function index(Request $request){
        return $request->user()->shippingAddresses;
    }

    public function store(Request $request){
        $validated = $request->validate([
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'country' => 'required|string|max:255',
        ]);

        $address = $request->user()->shippingAddresses()->create($validated);

        return response()->json($address, 201);
    }
}
