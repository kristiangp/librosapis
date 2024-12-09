import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { usePage } from '@inertiajs/react';

const CategoriaEdit = () => {
    const { slug } = useParams();
    const [categoria, setCategoria] = useState({
        porcentaje_comision: '',
    });
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
                setCategoria({
                    porcentaje_comision: response.data.porcentaje_comision,
                });
            } catch (error) {
                console.error('Error fetching categoria:', error);
            }
        };

        fetchCategoria();
    }, [slug, auth.user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoria({
            ...categoria,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = auth.user?.token || localStorage.getItem('token');
            await axios.put(`/api/categorias/${slug}`, categoria, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate(`/categorias/${slug}`);
        } catch (error) {
            console.error('Error updating categoria:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Categoría</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Porcentaje de Comisión</label>
                    <input
                        type="text"
                        name="porcentaje_comision"
                        value={categoria.porcentaje_comision}
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

export default CategoriaEdit;
