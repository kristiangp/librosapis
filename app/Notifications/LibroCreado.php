<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LibroCreado extends Notification
{
    use Queueable;

    protected $libro;

    /**
     * Create a new notification instance.
     */
    public function __construct($libro)
    {
        $this->libro = $libro;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Nuevo Libro Creado')
                    ->line('Se ha creado un nuevo libro: ' . $this->libro->titulo)
                    ->action('Ver Libro', url('/libros/' . $this->libro->slug))
                    ->line('Gracias por usar nuestra aplicación!');
    }
}
