import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListarCompras() {
    const urlBase = "http://ti.app.informaticapp.com:4163/api-ti/compras";
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        cargarCompras();
    }, []);

    const cargarCompras = async () => {
        const resultado = await axios.get(urlBase);
        console.log(resultado.data);
        setCompras(resultado.data);
    };

    const eliminarCompra = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarCompras();
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Sistema de registros de compras</h3>
            </div>

            <table className="table table-striped table-hover align-middle">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Proveedor</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Categoria del producto</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        compras.map((compra, indice) => (
                            <tr key={indice}>
                                <th scope="row">{compra.id}</th>
                                <td>{compra.proveedor.nombre}</td>
                                <td>{compra.producto.nombre}</td>
                                <td>{compra.producto.categoria.nombre}</td>
                                <td>{new Date(compra.fecha).toLocaleString()}</td>
                                <td>{compra.total}</td>
                                <td className='text-center'>
                                    <div>
                                        <Link to={`/EditarCompras/${compra.id}`} 
                                              className='btn btn-warning btn-sm me-3'>Editar</Link>
                                        <button onClick={() => eliminarCompra(compra.id)}
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
