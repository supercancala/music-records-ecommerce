<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artist>
 */
class ArtistFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $artists = ['The Beatles', 'Taylor Swift', 'Pink Floyd', 'Nirvana', 'Queen', 'Metallica', 'Miles Davis', 'Almendra', 'Black Country, New Road', 'Camel', 'Dave Brubeck', 'Elton John', 'Father John Misty', 'Gustavo Cerati', 'Hella', 'Ichiko Aoba', 'John Coltrane', 'King Crimson', 'Lil Nas X', 'Mother Mother', 'Nina Simone', 'Ornette Coleman', 'Paul McCartney', 'Quincy Jones', 'Radiohead', 'Santana', 'The Beach Boys', 'U2', 'Vince Staples', 'Wayne Shorter', 'Xiu Xiu', 'Yes', 'Zach Hill'];
        
        return [
            'name' => $this->faker->name(),
            'profile_picture_url' => '',
            'biography' => $this->faker->paragraph(), 
        ];
    }
}
