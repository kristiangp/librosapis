<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Libro;
use App\Models\Categoria;

class LibrosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Verificar que existan categorías en la base de datos
        if (Categoria::count() > 0) {
            // Crear 50 libros, asignando una categoría aleatoria a cada uno
            Libro::factory(50)->create([
                'categoria_id' => Categoria::inRandomOrder()->first()->id, // Asignar una categoría aleatoria
            ]);
        } else {
            // Si no hay categorías, lanzar una excepción o advertencia
            echo "No hay categorías en la base de datos. Asegúrate de ejecutar el CategoriasSeeder primero.";
        }
    }
}
