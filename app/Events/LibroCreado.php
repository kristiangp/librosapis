<?php

namespace App\Events;

use App\Models\Libro;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LibroCreado
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $libro;

    public function __construct(Libro $libro)
    {
        $this->libro = $libro;
    }
}
