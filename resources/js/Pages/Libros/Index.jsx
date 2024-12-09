import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import axios from 'axios';

const LibrosIndex = ({ libros, categorias }) => {
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const { auth } = usePage().props;

    const handleCategoriaChange = (event) => {
        const categoriaId = event.target.value === "" ? null : parseInt(event.target.value);
        setSelectedCategoria(categoriaId);
    };

    const filteredLibros = selectedCategoria
        ? libros.filter(libro => libro.categoria_id === selectedCategoria)
        : libros;

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/libros/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Libro eliminado exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
            // Actualizar la lista de libros después de eliminar
            window.location.reload();
        } catch (error) {
            console.error('Error deleting libro:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar el libro',
                text: error.response?.data?.message || 'Ocurrió un error inesperado',
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Categorías</h1>
            <div className="mb-8">
                <select
                    className="border border-gray-300 rounded p-2"
                    onChange={handleCategoriaChange}
                    value={selectedCategoria || ""}
                >
                    <option value="">Todas</option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <h1 className="text-2xl font-bold mb-4">Libros Disponibles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredLibros.map(libro => (
                    <div key={libro.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <Link href={`/libros/${libro.slug}`}>
                            <img src={`/storage/${libro.imagen}`} alt={libro.titulo} className="w-full h-48 object-cover" />
                        </Link>
                        <div className="p-4">
                            <Link href={`/libros/${libro.slug}`}>
                                <h2 className="text-xl font-semibold mb-2">{libro.titulo}</h2>
                            </Link>
                            <p className="text-gray-700 mb-1"><strong>Autor:</strong> {libro.autor}</p>
                            <p className="text-gray-700 mb-1"><strong>Género:</strong> {libro.genero}</p>
                            <p className="text-gray-700 mb-1"><strong>Precio:</strong> ${libro.precio}</p>
                            <p className="text-gray-700 mb-1"><strong>Disponible:</strong> {libro.disponible ? 'Sí' : 'No'}</p>
                            <p className="text-gray-700"><strong>Fecha de Lanzamiento:</strong> {libro.fecha_lanzamiento}</p>
                            {auth.user && (
                                <div className="mt-4 flex space-x-2">
                                    <Link href={`/libros/${libro.slug}/edit`} className="text-blue-500 hover:underline">
                                        Actualizar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(libro.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LibrosIndex;