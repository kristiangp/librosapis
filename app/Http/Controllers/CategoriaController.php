<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Http\Requests\StoreCategoriaRequest;
use App\Http\Requests\UpdateCategoriaRequest;

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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoriaRequest $request)
    {
    $categoria = Categoria::create($request->validated());
    return response()->json($categoria, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
    return $categoria;
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoriaRequest $request, Categoria $categoria)
    {
    $categoria->update($request->validated());
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
