import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgregarProducto() {
    const [nombre, setNombre] = useState('');
    const [precioMayor, setPrecioMayor] = useState('');
    const [precioMenor, setPrecioMenor] = useState('');
    const [precioPromocion, setPrecioPromocion] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [almacenId, setAlmacenId] = useState('');
    const [sucursalId, setSucursalId] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        cargarCategorias();
        cargarAlmacenes();
        cargarSucursales();
    }, []);

    const cargarCategorias = async () => {
        try {
            const resultado = await axios.get('http://ti.app.informaticapp.com:4181/api-ti/categorias');
            setCategorias(resultado.data);
        } catch (error) {
            console.error('Error al cargar categorías:', error);
        }
    };

    const cargarAlmacenes = async () => {
        try {
            const resultado = await axios.get('http://ti.app.informaticapp.com:4181/api-ti/almacenes');
            setAlmacenes(resultado.data);
        } catch (error) {
            console.error('Error al cargar almacenes:', error);
        }
    };

    const cargarSucursales = async () => {
        try {
            const resultado = await axios.get('http://ti.app.informaticapp.com:4181/api-ti/sucursales');
            setSucursales(resultado.data);
        } catch (error) {
            console.error('Error al cargar sucursales:', error);
        }
    };

    const agregarProducto = async (e) => {
        e.preventDefault();
        try {
            const producto = {
                nombre,
                precio_mayor: precioMayor,
                precio_menor: precioMenor,
                precio_promocion: precioPromocion,
                categoria: { id: categoriaId },
                almacen: { id: almacenId },
                sucursal: { id: sucursalId }
            };
            await axios.post('http://ti.app.informaticapp.com:4181/api-ti/productos', producto);
            navigate('/ListadoProductos');
        } catch (error) {
            setError('Error al agregar el producto');
            console.error('Error al agregar el producto:', error);
        }
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Agregar Producto</h3>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </div>
            <form onSubmit={agregarProducto}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio Mayor</label>
                    <input type="number" className="form-control" value={precioMayor} onChange={(e) => setPrecioMayor(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio Menor</label>
                    <input type="number" className="form-control" value={precioMenor} onChange={(e) => setPrecioMenor(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio Promoción</label>
                    <input type="number" className="form-control" value={precioPromocion} onChange={(e) => setPrecioPromocion(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <select className="form-select" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
                        <option value="">Seleccionar Categoría</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Almacén</label>
                    <select className="form-select" value={almacenId} onChange={(e) => setAlmacenId(e.target.value)} required>
                        <option value="">Seleccionar Almacén</option>
                        {almacenes.map(almacen => (
                            <option key={almacen.id} value={almacen.id}>{almacen.descripcion}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Sucursal</label>
                    <select className="form-select" value={sucursalId} onChange={(e) => setSucursalId(e.target.value)} required>
                        <option value="">Seleccionar Sucursal</option>
                        {sucursales.map(sucursal => (
                            <option key={sucursal.id} value={sucursal.id}>{sucursal.nombre}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Agregar Producto</button>
            </form>
        </div>
    );
}
