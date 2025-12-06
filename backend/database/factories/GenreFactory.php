<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Genre>
 */
class GenreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $genres = ['Ambient', 'Baroque', 'Classical', 'Cool Jazz', 'Dubstep', 'EDM', 'Fusion Jazz', 'Guaguancó', 'HipHop', 'IDM', 'Jazz', 'Kawaii Metal','Latin Jazz', 'Mambo', 'Neo-psychedelia', 'Opera', 'Plena', 'Rock Opera', 'Salsa', 'Tango', 'UK Garage', 'Vaporwave', 'West Coast Hip-Hop'];
        
        return [
            'name' => $this->faker->randomElement($genres),
        ];
    }
}
