import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListadoAlmacenes() {
    const urlBase = "http://localhost:8081/api-ti/almacenes";
    const [almacenes, setAlmacenes] = useState([]);
    const [mensajeError, setMensajeError] = useState('');

    useEffect(() => {
        cargarAlmacenes();
    }, []);

    const cargarAlmacenes = async () => {
        try {
            const resultado = await axios.get(urlBase);
            setAlmacenes(resultado.data);
            setMensajeError('');
        } catch (error) {
            console.error('Error al cargar almacenes:', error);
            setMensajeError('Error al cargar los almacenes.');
        }
    };

    const eliminarAlmacen = async (id) => {
        try {
            await axios.delete(`${urlBase}/${id}`);
            cargarAlmacenes();
            setMensajeError('');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setMensajeError('No se puede eliminar el almacén porque está asociado con otra entidad.');
            } else {
                console.error('Error al eliminar almacén:', error);
                setMensajeError('Error al eliminar el almacén.');
            }
        }
    };

    return (
        <div className='container mt-5'>
            <div className='text-center mb-4'>
                <h3>Listado de Almacenes</h3>
                {mensajeError && <div className="alert alert-danger mt-3">{mensajeError}</div>}
            </div>

            <div className="row">
                {almacenes.map((almacen, indice) => (
                    <div key={indice} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{almacen.descripcion}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Supervisor: {almacen.supervisor}</h6>
                                <p className="card-text">
                                    <strong>Teléfono:</strong> {almacen.telefonoSupervisor}<br />
                                    <strong>Lugar:</strong> {almacen.lugar.provincia}<br />
                                    <strong>Dirección:</strong> {almacen.lugar.direccionEspecifica}
                                    
                                </p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/EditarAlmacen/${almacen.id}`} className='btn btn-warning btn-sm'>Editar</Link>
                                    <button onClick={() => eliminarAlmacen(almacen.id)} className='btn btn-danger btn-sm'>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
