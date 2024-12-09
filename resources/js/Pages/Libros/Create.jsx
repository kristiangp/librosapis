import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar sweetalert2
import { Link } from '@inertiajs/react'; // Importar el componente Link de Inertia.js

const CreateLibro = () => {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [imagen, setImagen] = useState(null);
    const [genero, setGenero] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [anioPublicacion, setAnioPublicacion] = useState('');
    const [precio, setPrecio] = useState('');
    const [disponible, setDisponible] = useState(true);
    const [fechaLanzamiento, setFechaLanzamiento] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías

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

    const handleGeneroChange = (e) => {
        const selectedGenero = e.target.value;
        setGenero(selectedGenero);

        // Encontrar la categoría seleccionada y actualizar el estado de categoriaId
        const selectedCategoria = categorias.find(categoria => categoria.nombre === selectedGenero);
        if (selectedCategoria) {
            setCategoriaId(selectedCategoria.id);
        } else {
            setCategoriaId('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('autor', autor);
        if (imagen) {
            formData.append('imagen', imagen);
        }
        formData.append('genero', genero);
        formData.append('descripcion', descripcion);
        formData.append('anio_publicacion', anioPublicacion);
        formData.append('precio', precio);
        formData.append('disponible', disponible ? '1' : '0');
        formData.append('fecha_lanzamiento', fechaLanzamiento);
        formData.append('categoria_id', categoriaId);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/libros', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            console.log(response.data);

            // Mostrar alerta de éxito
            Swal.fire({
                icon: 'success',
                title: 'Libro creado exitosamente',
                showConfirmButton: false,
                timer: 1500
            });

            // Limpiar los campos del formulario
            setTitulo('');
            setAutor('');
            setImagen(null);
            setGenero('');
            setDescripcion('');
            setAnioPublicacion('');
            setPrecio('');
            setDisponible(true);
            setFechaLanzamiento('');
            setCategoriaId('');
        } catch (error) {
            console.error('Error creating libro:', error);

            // Mostrar alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el libro',
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
                            <label className="form-label">Título:</label>
                            <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Autor:</label>
                            <input type="text" className="form-control" value={autor} onChange={(e) => setAutor(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Imagen:</label>
                            <input type="file" className="form-control" onChange={(e) => setImagen(e.target.files[0])} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Género:</label>
                            <select className="form-control" value={genero} onChange={handleGeneroChange}>
                                <option value="">Seleccione un género</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.nombre}>
                                        {categoria.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Descripción:</label>
                            <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Año de Publicación:</label>
                            <input type="number" className="form-control" value={anioPublicacion} onChange={(e) => setAnioPublicacion(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Precio:</label>
                            <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
                            <label className="form-check-label">Disponible</label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fecha de Lanzamiento:</label>
                            <input type="date" className="form-control" value={fechaLanzamiento} onChange={(e) => setFechaLanzamiento(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Crear Libro</button>
                        <Link href="/dashboard" className="btn btn-secondary ml-2">Volver</Link> {/* Botón de volver */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateLibro;
