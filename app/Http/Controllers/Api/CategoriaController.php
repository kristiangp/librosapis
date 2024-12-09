<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Http\Requests\StoreCategoriaRequest;
use App\Http\Requests\UpdateCategoriaRequest;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;



class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Categoria::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoriaRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['nombre']);
        $categoria = Categoria::create($data);

        return response()->json($categoria, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $categoria = Categoria::with('libros')->where('slug', $slug)->firstOrFail();
        return response()->json($categoria, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoriaRequest $request, $slug)
    {
        $categoria = Categoria::where('slug', $slug)->first();
        if (!$categoria) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        $data = $request->validated();
        $categoria->update($data);

        return response()->json($categoria, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categoria)
    {
        $categoria->delete();
        return response()->json(null, 204);
    }
}
