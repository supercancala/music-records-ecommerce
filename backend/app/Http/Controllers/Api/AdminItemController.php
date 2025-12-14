<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;

class AdminItemController extends Controller
{
    public function store(Request $request)
    {
        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'description'    => 'nullable|string',
            'price'          => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'release_date'   => 'required|date',
            'cover_art_url'    => 'nullable|string',
            'country'        => 'nullable|string',
            'artists'        => 'nullable|string', // Expect a string now
            'genres'         => 'nullable|string', // Expect a string now
        ]);


        $item = Item::create([
            'title'          => $validated['title'],
            'description'    => $validated['description'] ?? '',
            'price'          => $validated['price'],
            'stock_quantity' => $validated['stock_quantity'],
            'release_date'   => $validated['release_date'],
            'cover_art_url'    => $validated['cover_art_url'] ?? 'https://vectorified.com/images/disc-icon-3.png',
            'country'        => $validated['country'] ?? 'International',
        ]);

        // 1. Handle Artists (Comma Separated)
        if (!empty($validated['artists'])) {
            $artistNames = explode(',', $validated['artists']);
            $artistIds = [];

            foreach ($artistNames as $name) {
                $name = trim($name);
                if ($name) {
                    // Create if doesn't exist, Get ID if it does
                    $artist = \App\Models\Artist::firstOrCreate(['name' => $name]);
                    $artistIds[] = $artist->id;
                }
            }
            $item->artists()->sync($artistIds);
        }

        // 2. Handle Genres (Comma Separated)
        if (!empty($validated['genres'])) {
            $genreNames = explode(',', $validated['genres']);
            $genreIds = [];

            foreach ($genreNames as $name) {
                $name = trim($name);
                if ($name) {
                    $genre = \App\Models\Genre::firstOrCreate(['name' => $name]);
                    $genreIds[] = $genre->id;
                }
            }
            $item->genres()->sync($genreIds);
        }

        return response()->json([
            'message' => 'Vinyl created successfully',
            'item' => $item->load(['artists', 'genres'])
        ], 201);
    }
}