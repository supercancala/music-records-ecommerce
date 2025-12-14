<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    public function index(Request $request){
        return $request->user()->paymentMethods;
    }

    public function store(Request $request){
        $validated = $request->validate([
            'card_brand' => 'required|string',
            'card_number' => 'required|string|min:16|max:19', // Allow spaces or standard lengths
        ]);

        // Clean the input (remove spaces/dashes if they typed them)
        $cleanNumber = preg_replace('/\D/', '', $validated['card_number']);
        // Extract the last 4 digits
        $lastFour = substr($cleanNumber, -4);

        $payment = $request->user()->paymentMethods()->create([
            'card_brand' => $validated['card_brand'],
            'last_4_digits' => $lastFour,
        ]);

        return response()->json($payment, 201);
    }
}
