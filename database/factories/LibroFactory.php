<?php

namespace Database\Factories;

use App\Models\Libro;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Libro>
 */
class LibroFactory extends Factory
{
    protected $model = Libro::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'titulo' => $this->faker->sentence(3),  // Título de 3 palabras
            'autor' => $this->faker->name(),
            'imagen' => $this->faker->imageUrl(640, 480, 'books', true), // URL de imagen aleatoria
            'genero' => $this->faker->word(),  // Género aleatorio
            'descripcion' => $this->faker->paragraph(4),  // Descripción de 4 oraciones
            'anio_publicacion' => $this->faker->year(),
            'precio' => $this->faker->randomFloat(2, 10, 100),  // Precio entre 10 y 100
            'disponible' => $this->faker->boolean(),
            'fecha_lanzamiento' => $this->faker->date(),
            'categoria_id' => $this->faker->numberBetween(1, 10)  // ID de categoría aleatorio
        ];
    }
}
