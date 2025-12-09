<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// 1. GET ALL ITEMS (For the Grid/Shop Page)
Route::get('/items', [ItemController::class, 'index']);

// 2. GET SINGLE ITEM (For the Product Details Page)
// Make sure this line has both [Class, 'method']
Route::get('/items/{id}', [ItemController::class, 'show']); 

// 3. User Routes (We will add these later)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});