<?php

namespace App\Mail;

use App\Models\Libro;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LibroCreadoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $libro;

    public function __construct(Libro $libro)
    {
        $this->libro = $libro;
    }

    public function build()
    {
        return $this->view('emails.libro_creado')
                    ->with([
                        'titulo' => $this->libro->titulo,
                        'autor' => $this->libro->autor,
                    ]);
    }
}
