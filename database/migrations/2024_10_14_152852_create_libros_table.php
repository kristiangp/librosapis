<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('libros', function (Blueprint $table) {
            $table->id(); // Tipo: entero autoincremental
            $table->string('titulo'); // Tipo: cadena de texto
            $table->string('autor'); // Tipo: cadena de texto
            $table->string('imagen')->nullable(); // Tipo: cadena de texto (opcional)
            $table->string('genero')->nullable(); // Tipo: cadena de texto (opcional)
            $table->text('descripcion')->nullable(); // Tipo: texto
            $table->integer('anio_publicacion'); // Tipo: entero
            $table->decimal('precio', 8, 2); // Tipo: decimal
            $table->boolean('disponible')->default(true); // Tipo: booleano
            $table->date('fecha_lanzamiento'); // Tipo: fecha
            $table->unsignedBigInteger('categoria_id'); // Tipo: entero sin signo (relación)
            $table->string('slug')->unique(); // Tipo: cadena de texto única
            $table->timestamps(); // created_at y updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('libros');
    }
};
