import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarCompras() {
    let navegacion = useNavigate();
    let { id } = useParams();
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [compra, setCompra] = useState({
        idproveedor: "",
        idproducto: "",
        fecha: "",
        total: ""
    });

    const { idproveedor, idproducto, fecha, total } = compra;

    useEffect(() => {
        cargarProveedores();
        cargarProductos();
        cargarCompra();
    }, []);

    const cargarProveedores = async () => {
        try {
            const resultado = await axios.get("http://ti.app.informaticapp.com:4163/api-ti/proveedores");
            setProveedores(resultado.data);
        } catch (error) {
            console.error('Error al cargar proveedores:', error);
        }
    };

    const cargarProductos = async () => {
        try {
            const resultado = await axios.get("http://ti.app.informaticapp.com:4163/api-ti/productos");
            setProductos(resultado.data);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    };

    const cargarCompra = async () => {
        try {
            const resultado = await axios.get(`http://ti.app.informaticapp.com:4163/api-ti/compras/${id}`);
            setCompra({
                idproveedor: resultado.data.proveedor.id,
                idproducto: resultado.data.producto.id,
                fecha: resultado.data.fecha,
                total: resultado.data.total
            });
        } catch (error) {
            console.error('Error al cargar compra:', error);
        }
    };

    const onInputChange = (e) => {
        setCompra({ ...compra, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = `http://ti.app.informaticapp.com:4163/api-ti/compras/${id}`;
        const compraData = {
            proveedor: {
                id: parseInt(compra.idproveedor)
            },
            producto: {
                id: parseInt(compra.idproducto)
            },
            fecha: compra.fecha,
            total: parseFloat(compra.total)
        };
        try {
            console.log('Enviando datos de compra:', compraData);  // Log para depuración
            const response = await axios.put(urlBase, compraData);
            console.log('Respuesta del servidor:', response.data);
            navegacion('/ListarCompras');
        } catch (error) {
            if (error.response) {
                console.error('Error en la respuesta:', error.response.data);
                console.error('Código de estado:', error.response.status);
                console.error('Encabezados:', error.response.headers);
            } else if (error.request) {
                console.error('Error en la solicitud:', error.request);
            } else {
                console.error('Error:', error.message);
            }
            console.error('Configuración:', error.config);
        }
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Editar Compra</h3>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="idproveedor" className="form-label">Proveedor</label>
                    <select
                        className="form-control"
                        id="idproveedor"
                        name="idproveedor"
                        required={true}
                        value={idproveedor}
                        onChange={(e) => onInputChange(e)}
                    >
                        <option value="">Seleccionar Proveedor</option>
                        {proveedores.map((proveedor) => (
                            <option key={proveedor.id} value={proveedor.id}>
                                {proveedor.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="idproducto" className="form-label">Producto</label>
                    <select
                        className="form-control"
                        id="idproducto"
                        name="idproducto"
                        required={true}
                        value={idproducto}
                        onChange={(e) => onInputChange(e)}
                    >
                        <option value="">Seleccionar Producto</option>
                        {productos.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                                {producto.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">Fecha</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="fecha"
                        name="fecha"
                        required={true}
                        value={fecha}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="total" className="form-label">Total</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="total"
                        name="total"
                        required={true}
                        value={total}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>

                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-sm me-3">Guardar</button>
                    <a href='/ListarCompras' className='btn btn-danger btn-sm'>Regresar</a>
                </div>
            </form>
        </div>
    );
}
