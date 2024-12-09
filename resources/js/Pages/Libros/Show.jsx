import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { usePage } from '@inertiajs/react';

const LibroShow = ({ slug }) => {
    const [libro, setLibro] = useState(null);
    const { auth } = usePage().props; // Obtener la información de autenticación
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLibro = async () => {
            try {
                const token = auth.user?.token || localStorage.getItem('token'); // Obtener el token de autenticación
                if (!token) {
                    // Redirigir al usuario a la página de inicio de sesión si no está autenticado
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`/api/libros/${slug}`, {
                    withCredentials: true, // Incluir credenciales en la solicitud
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluir el token de autenticación
                    },
                });
                setLibro(response.data);
            } catch (error) {
                console.error('Error fetching libro:', error);
            }
        };

        fetchLibro();
    }, [slug, auth.user, navigate]);

    if (!libro) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>{libro.titulo}</h1>
            {libro.imagen && <img src={`/storage/${libro.imagen}`} alt={libro.titulo} />}
            <p>{libro.descripcion}</p>
            <p>Autor: {libro.autor}</p>
            <p>Género: {libro.genero}</p>
            <p>Año de Publicación: {libro.anio_publicacion}</p>
            <p>Precio: ${libro.precio}</p>
            <p>Disponible: {libro.disponible ? 'Sí' : 'No'}</p>
            <p>Fecha de Lanzamiento: {libro.fecha_lanzamiento}</p>
            <p>Categoría: {libro.categoria.nombre}</p>
        </div>
    );
};

export default LibroShow;
