import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ListadoProductosPorSucursal() {
    const { id } = useParams();
    const urlBase = `http://localhost:8081/api-ti/productos/sucursal/${id}`;
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

    const eliminarProducto = async (productoId) => {
        try {
            await axios.delete(`http://localhost:8081/api-ti/productos/${productoId}`);
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
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Listado de Productos por Sucursal</h3>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </div>
            <Link to={`/agregar-producto-sucursal/${id}`} className='btn btn-primary mb-3'>Agregar Producto</Link>
            <table className="table table-striped table-hover align-middle">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio Mayor</th>
                        <th scope="col">Precio Menor</th>
                        <th scope="col">Precio Promoción</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Almacén</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((producto, indice) => (
                            <tr key={indice}>
                                <th scope="row">{producto.id}</th>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio_mayor}</td>
                                <td>{producto.precio_menor}</td>
                                <td>{producto.precio_promocion}</td>
                                <td>{producto.categoria ? producto.categoria.nombre : "Sin categoría"}</td>
                                <td>{producto.almacen ? producto.almacen.descripcion : "Sin almacén"}</td>
                                <td className='text-center'>
                                    <div>
                                        <Link to={`/EditarProducto/${producto.id}`}
                                              className='btn btn-warning btn-sm me-3'>Editar</Link>
                                        <button onClick={() => eliminarProducto(producto.id)}
                                                className='btn btn-danger btn-sm'>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
