<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Libro;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLibroRequest;
use App\Http\Requests\UpdateLibroRequest;
use App\Notifications\LibroCreado;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\Categoria;


class LibroController extends Controller
{
    /**
     * Mostrar una lista de los libros.
     */
    public function index()
    {
        $libros = Libro::with('categoria')->get();
        $categorias = Categoria::all();

        return Inertia::render('Libros/Index', [
            'libros' => $libros,
            'categorias' => $categorias,
        ]);
    }


    /**
     * Almacenar un nuevo libro.
     */
    public function store(StoreLibroRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('imagen')) {
            $data['imagen'] = $request->file('imagen')->store('imagenes', 'public');
        }

        $data['slug'] = Str::slug($data['titulo']);
        $libro = Libro::create($data);

        Notification::route('mail', 'admin@example.com')->notify(new LibroCreado($libro));
        // Disparar el evento
        return response()->json($libro, 201);
    }

    /**
     * Mostrar un libro específico.
     */
    public function show($slug)
    {
        // Buscar el libro por slug
        $libro = Libro::with('categoria')->where('slug', $slug)->firstOrFail();

        // Devolver el libro junto con la categoría asociada
        return response()->json($libro, 200);
    }

    /**
     * Actualizar un libro existente.
     */
    public function update(UpdateLibroRequest $request, $slug)
    {
        $libro = Libro::where('slug', $slug)->first();
        if (!$libro) {
            return response()->json(['message' => 'Libro no encontrado'], 404);
        }

        $data = $request->validated();

        $libro->update($data);

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

        if ($libro->imagen) {
            Storage::disk('public')->delete($libro->imagen);
        }

        $libro->delete();
        return response()->json(['message' => 'Libro eliminado'], 200);
    }
}
