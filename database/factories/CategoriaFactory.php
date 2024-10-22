<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categoria>
 */
class CategoriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
    return [
        'nombre' => $this->faker->word,
        'descripcion' => $this->faker->sentence,
        'activo' => $this->faker->boolean,
        'porcentaje_comision' => $this->faker->randomFloat(2, 5, 20)
    ];
    }
}
