<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LibroRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;  // Cambiar a true para autorizar la solicitud
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titulo' => ['required', 'string', 'max:255'],  // Obligatorio, texto, máximo 255 caracteres
            'autor' => ['required', 'string', 'max:255'],  // Obligatorio, texto, máximo 255 caracteres
            'imagen' => ['required', 'url'],  // Obligatorio, formato de URL
            'genero' => ['required', 'string', 'max:50'],  // Obligatorio, texto, máximo 50 caracteres
            'descripcion' => ['required', 'string', 'max:1000'],  // Obligatorio, texto, máximo 1000 caracteres
            'anio_publicacion' => ['required', 'integer', 'min:1000', 'max:' . date('Y')],  // Año válido
            'precio' => ['required', 'numeric', 'min:0'],  // Obligatorio, número, mínimo 0
            'disponible' => ['required', 'boolean'],  // Obligatorio, booleano
            'fecha_lanzamiento' => ['required', 'date'],  // Obligatorio, fecha válida
            'categoria_id' => ['required', 'integer', 'exists:categorias,id'],  // Relación válida con categorías
        ];
    }
}
