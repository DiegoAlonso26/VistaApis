import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListadoLugares() {
    const urlBase = "http://ti.app.informaticapp.com:4181/api-ti/lugares";
    const [lugares, setLugares] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarLugares();
    }, []);

    const cargarLugares = async () => {
        try {
            const resultado = await axios.get(urlBase);
            setLugares(resultado.data);
        } catch (error) {
            setError('Error al cargar lugares');
            console.error('Error al cargar lugares:', error);
        }
    };

    const eliminarLugar = async (id) => {
        try {
            await axios.delete(`${urlBase}/${id}`);
            cargarLugares();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
            } else {
                setError('Error al eliminar el lugar');
            }
            console.error('Error al eliminar el lugar:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <div className='text-center mb-4'>
                <h3>Listado de Lugares</h3>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </div>

            <div className="row">
                {lugares.map((lugar, indice) => (
                    <div key={indice} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100 border-0">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="card-title mb-0">{lugar.pais}</h5>
                                    <span className="badge bg-primary">{lugar.codigoPostal}</span>
                                </div>
                                <p className="card-text mb-1">
                                    <strong>Región:</strong> {lugar.region}
                                </p>
                                <p className="card-text mb-1">
                                    <strong>Distrito:</strong> {lugar.distrito}
                                </p>
                                <p className="card-text mb-1">
                                    <strong>Provincia:</strong> {lugar.provincia}
                                </p>
                                <p className="card-text mb-3">
                                    <strong>Dirección:</strong> {lugar.direccionEspecifica}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/EditarLugar/${lugar.id}`} className='btn btn-outline-warning btn-sm'>Editar</Link>
                                    <button onClick={() => eliminarLugar(lugar.id)} className='btn btn-outline-danger btn-sm'>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
