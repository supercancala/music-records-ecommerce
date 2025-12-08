<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
    public function index(Request $request){
        // Eagerly load artists and genres
        $query = Item::with(['artists', 'genres']);
        
        // Search filter logic
        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(function($q) use ($searchTerm){
                // Check vinyl title
                $q->where('title', 'LIKE', "%{$searchTerm}%")
                // Or artists name
                ->orWhereHas('artists', function($artistsQuery) use ($searchTerm){
                    $artistsQuery->where('name', 'LIKE', "%{$searchTerm}%");
                });
            });
        }
        // Genre filter logic
        if ($request->filled('category')){
            $category = $request->input('category');

            $query->whereHas('genres', function($q) use ($category){
                $q->where('name', $category);
            });
        }

        // Sorting logic
        if ($request->filled('sort')){
            switch ($request->input('sort')) {
                case 'newest':
                    $query->orderBy('release_date', 'desc');
                    break;
                case 'price_low':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_high':
                    $query->orderBy('price', 'desc');
                    break;
                case 'bestsellers':
                    $query->orderBy('stock_quantity', 'asc'); 
                    break;
                case 'alphabetical_asc':
                    $query->orderBy('title', 'asc');
                    break;
                case 'alphabetical_desc':
                    $query->orderBy('title', 'desc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        }
        return response()->json($query->get());
    }

    public function show($id){
        // Find item by id
        $item = Item::with(['artists', 'genres'])->findOrFail($id);

        return response()->json($item);
    }

}
