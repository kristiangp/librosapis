<?php

namespace App\Observers;

use App\Models\Libro;
use Illuminate\Support\Str;

class LibroObserver
{
    public function creating(Libro $libro) {
        $libro->slug = Str::slug($libro->titulo);
    }
}
