import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListadoProveedores() {
    const urlBase = "http://localhost:8081/api-ti/proveedores";
    const [proveedores, setProveedores] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarProveedores();
    }, []);

    const cargarProveedores = async () => {
        try {
            const resultado = await axios.get(urlBase);
            setProveedores(resultado.data);
            setError(null); // Limpiar cualquier error previo
        } catch (error) {
            console.error("Error cargando proveedores:", error);
            setError("Error cargando proveedores.");
        }
    };

    const eliminarProveedor = async (id) => {
        try {
            await axios.delete(`${urlBase}/${id}`);
            cargarProveedores();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
            } else {
                console.error("Error eliminando el proveedor:", error);
                setError("Error eliminando el proveedor.");
            }
        }
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Sistema de registros proveedores</h3>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </div>

            <table className="table table-striped table-hover align-middle">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Teléfono</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map((proveedor, indice) => (
                        <tr key={indice}>
                            <th scope="row">{proveedor.id}</th>
                            <td>{proveedor.nombre}</td>
                            <td>{proveedor.direccion}</td>
                            <td>{proveedor.telefono}</td>
                            <td className='text-center'>
                                <div>
                                    <Link to={`/EditarProveedores/${proveedor.id}`}
                                        className='btn btn-warning btn-sm me-3'>Editar</Link>
                                    <button onClick={() => eliminarProveedor(proveedor.id)}
                                        className='btn btn-danger btn-sm'>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
