<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Libro;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLibroRequest;
use App\Http\Requests\UpdateLibroRequest;

class LibroController extends Controller
{
    /**
     * Mostrar una lista de los libros.
     */
    public function index()
    {
        $libros = Libro::all();
        return response()->json($libros, 200);
    }

    /**
     * Almacenar un nuevo libro.
     */
    public function store(StoreLibroRequest $request)
    {
        $libro = Libro::create($request->validated());
        return response()->json($libro, 201);
    }

    /**
     * Mostrar un libro específico.
     */
    public function show($id)
    {
    // Buscar el libro por ID
    $libro = Libro::with('categoria')->find($id); // Cargar también la categoría

    // Validar si el libro existe
    if (!$libro) {
        return response()->json(['message' => 'Libro no encontrado'], 404);
    }

    // Devolver el libro junto con la categoría asociada
    return response()->json($libro, 200);
    }


    /**
     * Actualizar un libro existente.
     */
    public function update(UpdateLibroRequest $request, $id)
    {
        $libro = Libro::find($id);
        if (!$libro) {
            return response()->json(['message' => 'Libro no encontrado'], 404);
        }
        $libro->update($request->validated());
        return response()->json($libro, 200);
    }

    /**
     * Eliminar un libro.
     */
    public function destroy($id)
    {
        $libro = Libro::find($id);
        if (!$libro) {
            return response()->json(['message' => 'Libro no encontrado'], 404);
        }
        $libro->delete();
        return response()->json(['message' => 'Libro eliminado'], 200);
    }
}

