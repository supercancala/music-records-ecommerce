<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
    public function index(){
        // Fecth all items AND their related artists and genres
        $items = Item::with(['artists', 'genres'])->get();

        return response()->json($items);
    }

    public function show($id){
        // Find item by id
        $item = Item::with(['artists', 'genres'])->findOrFail($id);

        return response()->json($item);
    }

}
