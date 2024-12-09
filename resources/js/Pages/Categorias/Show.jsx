import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { usePage } from '@inertiajs/react';

const CategoriaShow = () => {
    const { slug } = useParams();
    const [categoria, setCategoria] = useState(null);
    const { auth } = usePage().props;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const token = auth.user?.token || localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`/api/categorias/${slug}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategoria(response.data);
            } catch (error) {
                console.error('Error fetching categoria:', error);
            }
        };

        if (slug) {
            fetchCategoria();
        }
    }, [slug, auth.user, navigate]);

    if (!categoria) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{categoria.nombre}</h1>
            <p className="text-gray-700 mb-4">{categoria.descripcion}</p>
            <h2 className="text-xl font-semibold mb-2">Libros en esta categoría:</h2>
            <ul className="list-disc pl-5">
                {categoria.libros.map(libro => (
                    <li key={libro.id} className="mb-2">
                        <a href={`/libros/${libro.slug}`} className="text-blue-500 hover:underline">{libro.titulo}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriaShow;
