import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ListadoProductos.css';

export default function ListadoProductos() {
    const urlBase = "http://localhost:8081/api-ti/productos";
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const resultado = await axios.get(urlBase);
            setProductos(resultado.data);
        } catch (error) {
            setError('Error al cargar productos');
            console.error('Error al cargar productos:', error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await axios.delete(`${urlBase}/${id}`);
            cargarProductos();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
            } else {
                setError('Error al eliminar el producto');
            }
            console.error('Error al eliminar el producto:', error);
        }
    };

    return (
        <div className='container my-5'>
            <div className='text-center mb-4'>
                <h3>Listado de Productos</h3>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </div>
            <div className="row">
                {productos.map((producto, indice) => (
                    <div className="col-md-4 mb-4" key={indice}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text flex-grow-1">
                                    <strong>ID:</strong> {producto.id}<br />
                                    <strong>Precio Mayor:</strong> {producto.precio_mayor}<br />
                                    <strong>Precio Menor:</strong> {producto.precio_menor}<br />
                                    <strong>Precio Promoción:</strong> {producto.precio_promocion}<br />
                                    <strong>Categoría:</strong> {producto.categoria ? producto.categoria.nombre : "Sin categoría"}<br />
                                    <strong>Almacén:</strong> {producto.almacen ? producto.almacen.descripcion : "Sin almacén"}<br />
                                    <strong>Sucursal:</strong> {producto.sucursal ? producto.sucursal.nombre : "Sin sucursal"}
                                </p>
                            </div>
                            <div className="card-footer text-center bg-light">
                                <div className='btn-group'>
                                    <Link to={`/EditarProducto/${producto.id}`} className='btn btn-warning btn-sm'>Editar</Link>
                                    <button onClick={() => eliminarProducto(producto.id)} className='btn btn-danger btn-sm'>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
