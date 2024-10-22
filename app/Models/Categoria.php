<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    // Los campos que se pueden asignar en masa
    protected $fillable = [
        'nombre',
        'descripcion',
        'activo',
        'porcentaje_comision',
    ];

    // Relación de 1 a N con libros
    public function libros()
    {
        return $this->hasMany(Libro::class);
    }

    
}
