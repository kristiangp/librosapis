<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    use HasFactory;

    // Agrega esta propiedad para definir los campos que pueden ser llenados masivamente
    protected $fillable = [
        "titulo",
        "autor",
        "imagen",
        "genero",
        "descripcion",
        "anio_publicacion",
        "precio",
        "disponible",
        "fecha_lanzamiento",
        "categoria_id"
    ];
}
