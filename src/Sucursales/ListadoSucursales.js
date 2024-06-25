import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ListadoSucursales.css';

export default function ListadoSucursales() {
    const urlBase = "http://localhost:8081/api-ti/sucursales";
    const [sucursales, setSucursales] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarSucursales();
    }, []);

    const cargarSucursales = async () => {
        try {
            const resultado = await axios.get(urlBase);
            setSucursales(resultado.data);
        } catch (error) {
            setError('Error al cargar sucursales');
            console.error('Error al cargar sucursales:', error);
        }
    };

    const eliminarSucursal = async (id) => {
        try {
            await axios.delete(`${urlBase}/${id}`);
            cargarSucursales();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
            } else {
                setError('Error al eliminar la sucursal');
            }
            console.error('Error al eliminar la sucursal:', error);
        }
    };

    return (
        <div className='container my-5'>
            <div className='text-center mb-4'>
                <h3>Listado de Sucursales</h3>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </div>
            <div className="row">
                {sucursales.map((sucursal, indice) => (
                    <div className="col-md-4 mb-4" key={indice}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{sucursal.nombre}</h5>
                                <p className="card-text flex-grow-1">
                                    <strong>ID:</strong> {sucursal.id}<br />
                                    <strong>Representante:</strong> {sucursal.representante}<br />
                                    <strong>Teléfono:</strong> {sucursal.telefono}<br />
                                    <strong>Ciudad:</strong> {sucursal.lugar.provincia}<br />
                                    <strong>Dirección:</strong> {sucursal.lugar.direccionEspecifica}
                                </p>
                            </div>
                            <div className="card-footer text-center bg-light">
                                <div className='btn-group'>
                                    <Link to={`/productos-sucursal/${sucursal.id}`} className='btn btn-info btn-sm me-3'>Ver Productos</Link>
                                    <Link to={`/EditarSucursal/${sucursal.id}`} className='btn btn-warning btn-sm me-3'>Editar</Link>
                                    <button onClick={() => eliminarSucursal(sucursal.id)} className='btn btn-danger btn-sm'>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
