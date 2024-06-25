import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListadoCategorias() {
    const urlBase = "http://localhost:8081/api-ti/categorias";
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const resultado = await axios.get(urlBase);
            setCategorias(resultado.data);
        } catch (error) {
            setError('Error al cargar categorías');
            console.error('Error al cargar categorías:', error);
        }
    };

    const eliminarCategoria = async (id) => {
        try {
            await axios.delete(`${urlBase}/${id}`);
            cargarCategorias();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
            } else {
                setError('Error al eliminar la categoría');
            }
            console.error('Error al eliminar la categoría:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <div className='text-center mb-4'>
                <h3>Listado de Categorías</h3>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </div>

            <div className="row">
                {categorias.map((categoria, indice) => (
                    <div key={indice} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{categoria.nombre}</h5>
                                <p className="card-text">
                                    <strong>Descripción:</strong> {categoria.descripcion}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/EditarCategorias/${categoria.id}`} className='btn btn-warning btn-sm'>Editar</Link>
                                    <button onClick={() => eliminarCategoria(categoria.id)} className='btn btn-danger btn-sm'>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
