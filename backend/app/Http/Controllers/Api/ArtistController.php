<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Artist;

class ArtistController extends Controller
{
    // 1. Fetch All Artists (Alphabetical)
    // GET /api/artists
    public function index()
    {
        return response()->json(Artist::orderBy('name', 'asc')->get());
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        if (!$query) {
            return response()->json([], 400);
        }

        $artists = Artist::where('name', 'LIKE', "%{$query}%")
                         ->with('items') // Show intention: we want to see their albums too!
                         ->get();

        return response()->json($artists);
    }
}
