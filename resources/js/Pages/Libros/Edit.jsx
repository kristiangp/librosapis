import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { usePage } from '@inertiajs/react';

const LibroEdit = () => {
    const { slug } = useParams(); // Verificar que useParams está funcionando correctamente
    const [libro, setLibro] = useState({
        precio: '',
    });
    const { auth } = usePage().props;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLibro = async () => {
            try {
                const token = auth.user?.token || localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                console.log('Token:', token);
                console.log('GET URL:', `/api/libros/${slug}`);

                const response = await axios.get(`/api/libros/${slug}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLibro({
                    precio: response.data.precio,
                });
            } catch (error) {
                console.error('Error fetching libro:', error);
            }
        };

        // Verificación del slug
        console.log('slug:', slug);
        if (slug) {
            fetchLibro();
        } else {
            console.error('Slug is undefined');
        }
    }, [slug, auth.user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLibro({
            ...libro,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = auth.user?.token || localStorage.getItem('token');
            console.log('PUT URL:', `/api/libros/${slug}`);
            await axios.put(`/api/libros/${slug}`, libro, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate(`/libros/${slug}`);
        } catch (error) {
            console.error('Error updating libro:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Libro</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Precio</label>
                    <input
                        type="text"
                        name="precio"
                        value={libro.precio}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default LibroEdit;
