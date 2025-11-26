<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Genre;
use App\Models\Artist;
use App\Models\Item;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::create([
            'Fname' => 'Admin',
            'Lname' => 'User',
            'username' => 'admin',
            'email' => 'admin@musicstore.com',
            'password' => Hash::make('password123'),
            'is_admin' => true,
        ]);

        // Create genres
        $rock = Genre::create(['name' => 'Rock']);
        $pop = Genre::create(['name' => 'Pop']);
        $jazz = Genre::create(['name' => 'Jazz']);
        $latin = Genre::create(['name' => 'Latin']);
        $salsa = Genre::create(['name' => 'Salsa']);
        $reggaeton = Genre::create(['name' => 'Reggaeton']);
        $classical = Genre::create(['name' => 'Classical']);
        $disco = Genre::create(['name' => 'Disco']);
        $soul = Genre::create(['name' => 'Soul']);
        $fusion = Genre::create(['name' => 'Fusion']);
        $bolero = Genre::create(['name' => 'Bolero']);

        // Create Artists
        $beatles = Artist::create([
            'name' => 'The Beatles',
            'biography' => 'The legendary band from Liverpool.'
        ]);

        $taylor = Artist::create([
            'name' => 'Taylor Swift',
            'biography' => 'American singer-songwriter.'
        ]);

        $abbeyRoad = Item::create([
            'title' => 'Abbey Road',
            'description' => 'The eleventh studio album by The Beatles.',
            'price' => 29.99,
            'stock_quantity' => 20,
            'release_date' => '1965-09-26',
            'country' => 'UK',
        ]);

        $abbeyRoad->genres()->attach($rock->id);
        $abbeyRoad->artists()->attach($beatles->id);

        $midnights = Item::create([
            'title' => 'Midnights',
            'description' => 'A concept album about nocturnal ruminations, it contains confessional songs that explore regret, self-criticism, fantasies, heartbreak, and infatuation. ',
            'price' => 34.99,
            'release_date' => '2022-10-21',
            'stock_quantity' => 50,
            'country' => 'USA'
        ]);

        $midnights->genres()->attach($pop->id);
        $midnights->artists()->attach($taylor->id);

        echo('Database populated successfully.');
    }
}
