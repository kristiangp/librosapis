import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar sweetalert2
import { Link } from '@inertiajs/react'; // Importar el componente Link de Inertia.js

const CreateCategoria = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [activo, setActivo] = useState(true);
    const [porcentajeComision, setPorcentajeComision] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nombre,
            descripcion,
            activo,
            porcentaje_comision: porcentajeComision,
        };

        try {
            const token = localStorage.getItem('token'); // Obtener el token de localStorage
            const response = await axios.post('/api/categorias', data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluir el token de autenticación
                },
                withCredentials: true, // Incluir credenciales en la solicitud
            });
            console.log(response.data);

            // Mostrar alerta de éxito
            Swal.fire({
                icon: 'success',
                title: 'Categoría creada exitosamente',
                showConfirmButton: false,
                timer: 1500
            });

            // Limpiar los campos del formulario
            setNombre('');
            setDescripcion('');
            setActivo(true);
            setPorcentajeComision('');
        } catch (error) {
            console.error('Error creating categoria:', error);

            // Mostrar alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la categoría',
                text: error.response?.data?.message || 'Ocurrió un error inesperado',
            });
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre:</label>
                            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripción:</label>
                            <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
                            <label className="form-check-label">Activo</label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Porcentaje de Comisión:</label>
                            <input type="number" className="form-control" value={porcentajeComision} onChange={(e) => setPorcentajeComision(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Crear Categoría</button>
                        <Link href="/dashboard" className="btn btn-secondary ml-2">Volver</Link> {/* Botón de volver */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCategoria;
