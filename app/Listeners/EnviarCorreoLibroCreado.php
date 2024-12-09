<?php

namespace App\Listeners;

use App\Events\LibroCreado;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use App\Mail\LibroCreadoMail;

class EnviarCorreoLibroCreado
{
    public function __construct()
    {
        //
    }

    public function handle(LibroCreado $event)
    {
        Mail::to('recipient@example.com')->send(new LibroCreadoMail($event->libro));
    }
}
