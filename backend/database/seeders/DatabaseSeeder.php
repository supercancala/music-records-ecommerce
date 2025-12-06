<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Genre;
use App\Models\Artist;
use App\Models\Item;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Admin (Safe)
        User::firstOrCreate(
            ['email' => 'admin@musicstore.com'],
            [
                'Fname' => 'Admin',
                'Lname' => 'User',
                'username' => 'admin',
                'password' => Hash::make('password123'),
                'is_admin' => true,
            ]
        );

        // 2. Define your Lists (Data Source)
        $genreNames = ['Rock', 'Pop', 'Jazz', 'Hip Hop', 'Electronic', 'Classical', 'R&B', 'Reggae', 'Blues', 'Metal'];
        
        $artistNames = [
            'The Beatles', 'Taylor Swift', 'Pink Floyd', 'Nirvana', 'Queen', 
            'Metallica', 'Miles Davis', 'Almendra', 'Radiohead', 'Daft Punk'
            // Add as many as you want here...
        ];

        // 3. Create Genres (SAFE LOOP)
        // We collect the IDs so we can use them later
        $genres = collect($genreNames)->map(function ($name) {
            return Genre::firstOrCreate(['name' => $name]);
        });

        // 4. Create Artists (SAFE LOOP)
        $artists = collect($artistNames)->map(function ($name) {
            // This uses your ArtistFactory logic (biography, etc.)
            // BUT forces the name to be the one from your list.
            return Artist::factory()->create([
                'name' => $name
            ]);
        });

        // 5. Create Items and Link them Randomly
        // Now we can safely use the factory for ITEMS, but link to EXISTING artists
        Item::factory(50)->create()->each(function ($item) use ($genres, $artists) {
            
            // Pick one random Genre from our created list
            $randomGenre = $genres->random();
            $item->genres()->attach($randomGenre);

            // Pick one random Artist from our created list
            $randomArtist = $artists->random();
            $item->artists()->attach($randomArtist);
        });

        echo "Database seeded successfully with UNIQUE artists and genres! 🎸\n";
    }
}