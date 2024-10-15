<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLibroRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Ajusta según tu lógica de autorización
    }

    public function rules()
    {
        return [
            'titulo' => 'sometimes|required|string|max:255|min:3',
            'autor' => 'sometimes|required|string|max:255|min:3',
            'descripcion' => 'nullable|string',
            'anio_publicacion' => 'sometimes|required|integer|min:1000|max:' . date('Y'),
            'precio' => 'sometimes|required|numeric|min:0',
            'disponible' => 'boolean',
            'fecha_lanzamiento' => 'sometimes|required|date',
            'categoria_id' => 'sometimes|required|exists:categorias,id',
        ];
    }
}
