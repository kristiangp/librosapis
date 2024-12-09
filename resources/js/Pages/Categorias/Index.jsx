import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import axios from 'axios';

const CategoriasIndex = () => {
    const [categorias, setCategorias] = useState([]);
    const { auth } = usePage().props;

    useEffect(() => {
        if (auth.user) {
            const fetchCategorias = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get('/api/categorias', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setCategorias(response.data);
                } catch (error) {
                    console.error('Error fetching categorias:', error);
                }
            };

            fetchCategorias();
        }
    }, [auth.user]);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/categorias/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Categoría eliminada exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
            // Actualizar la lista de categorías después de eliminar
            setCategorias(categorias.filter(categoria => categoria.id !== id));
        } catch (error) {
            console.error('Error deleting categoria:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar la categoría',
                text: error.response?.data?.message || 'Ocurrió un error inesperado',
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Categorías Disponibles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categorias.map(categoria => (
                    <div key={categoria.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-4">
                            <Link href={`/categorias/${categoria.slug}`}>
                                <h2 className="text-xl font-semibold mb-2">{categoria.nombre}</h2>
                            </Link>
                            <p className="text-gray-700 mb-1"><strong>ID:</strong> {categoria.id}</p>
                            <p className="text-gray-700 mb-1"><strong>Slug:</strong> {categoria.slug}</p>
                            {auth.user && (
                                <div className="mt-4 flex space-x-2">
                                    <Link href={`/categorias/${categoria.slug}/edit`} className="text-blue-500 hover:underline">
                                        Actualizar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(categoria.id)}
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

export default CategoriasIndex;
