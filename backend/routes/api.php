<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ShippingAddressController;
use App\Http\Controllers\Api\PaymentMethodController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AdminOrderController;
use App\Http\Controllers\Api\AdminItemController;
use App\Http\Controllers\Api\ArtistController;

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

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('/artists', [ArtistController::class, 'index']);
Route::get('/artists/search', [ArtistController::class, 'search']);

Route::get('/genres', [GenreController::class, 'index']);

// 3. User Routes (We will add these later)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/addresses', [ShippingAddressController::class, 'index']);
    Route::post('/addresses', [ShippingAddressController::class, 'store']);
    Route::get('/payments', [PaymentMethodController::class, 'index']);
    Route::post('/payments', [PaymentMethodController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/admin/orders', [AdminOrderController::class, 'index']);
    Route::patch('/admin/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);
    Route::post('/admin/items', [AdminItemController::class, 'store']);
});