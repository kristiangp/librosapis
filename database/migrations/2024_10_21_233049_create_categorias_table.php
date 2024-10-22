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
    Schema::create('categorias', function (Blueprint $table) {
        $table->id(); // ID autoincremental
        $table->string('nombre'); // Nombre de la categoría
        $table->text('descripcion'); // Descripción de la categoría
        $table->boolean('activo'); // Estado de la categoría (activa o no)
        $table->decimal('porcentaje_comision', 5, 2); // Ejemplo de un campo decimal
        $table->timestamps(); // Marcas de tiempo (creado y actualizado)
    });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categorias');
    }
};
