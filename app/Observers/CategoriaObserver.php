<?php

namespace App\Observers;

use App\Models\Categoria;
use Illuminate\Support\Str;

class CategoriaObserver
{
    public function creating(Categoria $categoria) {
        $categoria->slug = Str::slug($categoria->nombre);
    }
}
