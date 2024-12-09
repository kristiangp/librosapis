<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\LibroController;
use App\Http\Controllers\Api\CategoriaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Ruta principal que muestra los libros disponibles
// Ruta principal que muestra la página de bienvenida
Route::get('/', function () {
    $libros = \App\Models\Libro::all();
    $categorias = \App\Models\Categoria::all();
    return Inertia::render('Welcome', [
        'libros' => $libros,
        'categorias' => $categorias,
    ]);
})->name('welcome');

// Ruta para mostrar el formulario de creación de un libro
Route::get('/libros/create', function () {
    return Inertia::render('Libros/Create');
})->middleware(['auth', 'verified'])->name('libros.create');

// Ruta para mostrar el detalle de un libro específico
Route::get('/libros/{slug}', function ($slug) {
    return Inertia::render('Libros/Show', ['slug' => $slug]);
})->name('libros.show');

// Ruta para mostrar la vista de edición de un libro
Route::get('/libros/{slug}/edit', function ($slug) {
    return Inertia::render('Libros/Edit', ['slug' => $slug]);
})->middleware(['auth', 'verified'])->name('libros.edit');


// Ruta para mostrar las categorías
Route::get('/categorias', function () {
    return Inertia::render('Categorias/Index');
})->name('categorias.index');

// Ruta para mostrar el formulario de creación de una categoría
Route::get('/categorias/create', function () {
    return Inertia::render('Categorias/Create');
})->middleware(['auth', 'verified'])->name('categorias.create');

// Ruta para mostrar el detalle de una categoría específica
Route::get('/categorias/{slug}', function ($slug) {
    return Inertia::render('Categorias/Show', ['slug' => $slug]);
})->name('categorias.show');

// Ruta para mostrar la vista de edición de una categoría
Route::get('/categorias/{slug}/edit', function ($slug) {
    return Inertia::render('Categorias/Edit', ['slug' => $slug]);
})->middleware(['auth', 'verified'])->name('categorias.edit');


// Ruta para la página de bienvenida
Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Ruta para el dashboard, protegida por autenticación
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Ruta para mostrar la vista de CRUD de libros
Route::get('/libros', function () {
    $libros = \App\Models\Libro::all();
    $categorias = \App\Models\Categoria::all();
    return Inertia::render('Libros/Index', [
        'libros' => $libros,
        'categorias' => $categorias,
    ]);
})->middleware(['auth', 'verified'])->name('libros.index');


// Ruta para mostrar la vista de CRUD de categorías
Route::get('/categorias', function () {
    $categorias = \App\Models\Categoria::all();
    return Inertia::render('Categorias/Index', [
        'categorias' => $categorias,
    ]);
})->middleware(['auth', 'verified'])->name('categorias.index');


// Grupo de rutas protegidas por autenticación
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Incluir las rutas de autenticación generadas por Laravel Breeze
require __DIR__.'/auth.php';
