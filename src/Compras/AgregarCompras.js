import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgregarCompra() {
    let navegacion = useNavigate();
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

    const onInputChange = (e) => {
        setCompra({ ...compra, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://ti.app.informaticapp.com:4163/api-ti/compras";
        const compraData = {
            proveedor: { id: parseInt(compra.idproveedor) },
            producto: { id: parseInt(compra.idproducto) },
            fecha: compra.fecha,
            total: parseFloat(compra.total)
        };
        try {
            await axios.post(urlBase, compraData);
            navegacion('/ListarCompras');
        } catch (error) {
            console.error('Error al agregar compra:', error);
        }
    };
    

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Agregar Compra</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="idproveedor" className="form-label">Proveedor</label>
                    <select
                        className="form-control"
                        id="idproveedor"
                        name="idproveedor"
                        required={true}
                        value={idproveedor}
                        onChange={onInputChange}
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
                        onChange={onInputChange}
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
                        onChange={onInputChange}
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
                        onChange={onInputChange}
                    />
                </div>

                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-sm me-3">Agregar</button>
                    <a href='/ListarCompras' className='btn btn-danger btn-sm'>Regresar</a>
                </div>
            </form>
        </div>
    );
}
