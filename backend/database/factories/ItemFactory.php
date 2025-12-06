<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $artists = ['The Beatles', 'Taylor Swift', 'Pink Floyd', 'Nirvana', 'Queen', 'Metalica', 'Miles Davis', 'Almendra', 'Black Country, New Road', 'Camel', 'Dave Brubeck', 'Elton John', 'Father John Misty', 'Gustavo Cerati', 'Hella', 'Ichiko Aoba', 'John Coltrane', 'King Crimson', 'Lil Nas X', 'Mother Mother', 'Nina Simone', 'Ornette Coleman', 'Paul McCartney', 'Quincy Jones', 'Radiohead', 'Santana', 'The Beach Boys', 'U2', 'Vince Staples', 'Wayne Shorter', 'Xiu Xiu', 'Yes', 'Zach Hill'];
        
        return [
            'title' => $this->faker->catchPhrase(),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 15, 60),
            'stock_quantity' => $this->faker->numberBetween(0,100),
            'country' => $this->faker->countryCode(),
            'cover_art_url' => '',
            'release_date' => $this->faker->date(),
        ];
    }
}
