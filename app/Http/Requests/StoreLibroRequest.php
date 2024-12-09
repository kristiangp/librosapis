<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLibroRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Ajusta según tu lógica de autorización
    }

    public function rules()
    {
        return [
            'titulo' => 'required|string|max:255|min:3',
            'autor' => 'required|string|max:255|min:3',
            'descripcion' => 'nullable|string',
            'genero' => 'nullable|string|max:255', // Añadir la validación para el campo género
            'anio_publicacion' => 'required|integer|min:1000|max:' . date('Y'),
            'precio' => 'required|numeric|min:0',
            'disponible' => 'boolean',
            'fecha_lanzamiento' => 'required|date',
            'categoria_id' => 'required|exists:categorias,id'
        ];
    }
}
