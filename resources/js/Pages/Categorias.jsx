import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import Swal from 'sweetalert2';

const CategoriasIndex = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
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
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/categorias/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCategorias(categorias.filter(categoria => categoria.id !== id));
            Swal.fire({
                icon: 'success',
                title: 'Categoría eliminada exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
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
                            <h2 className="text-xl font-semibold mb-2">{categoria.nombre}</h2>
                            <p className="text-gray-700 mb-1"><strong>Descripción:</strong> {categoria.descripcion}</p>
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriasIndex;
