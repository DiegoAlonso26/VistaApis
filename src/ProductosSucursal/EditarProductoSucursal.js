import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarProductoSucursal() {
  const { id } = useParams();
  const [productoId, setProductoId] = useState('');
  const [codigo, setCodigo] = useState('');
  const [productos, setProductos] = useState([]);
  const [sucursalId, setSucursalId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    cargarProductoSucursal();
    cargarProductos();
  }, []);

  const cargarProductoSucursal = async () => {
    try {
      const resultado = await axios.get(`http://ti.app.informaticapp.com:4181/api-ti/productos-sucursal/buscarProductoSucursal/${id}`);
      setProductoId(resultado.data.producto.id);
      setCodigo(resultado.data.codigo);
      setSucursalId(resultado.data.sucursal.id);
    } catch (error) {
      console.error('Error al cargar el producto de sucursal:', error);
      setError('Error al cargar el producto de sucursal');
    }
  };

  const cargarProductos = async () => {
    try {
      const resultado = await axios.get("http://ti.app.informaticapp.com:4181/api-ti/productos");
      setProductos(resultado.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setError('Error al cargar productos');
    }
  };

  const actualizarProducto = async (e) => {
    e.preventDefault();
    try {
      const productoSucursalActualizado = { producto: { id: productoId }, sucursal: { id: sucursalId }, codigo };
      await axios.put(`http://ti.app.informaticapp.com:4181/api-ti/productos-sucursal/actualizarProductoSucursal/${id}`, productoSucursalActualizado);
      navigate(`/listar-productos-sucursal/${sucursalId}`);
    } catch (error) {
      console.error('Error al actualizar producto de sucursal:', error);
      setError('Error al actualizar producto de sucursal');
    }
  };

  return (
    <div className='container'>
      <div className='container text-center' style={{ margin: "30px" }}>
        <h3>Editar Producto de Sucursal</h3>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
      </div>
      <form onSubmit={actualizarProducto}>
        <div className='form-group'>
          <label>Producto</label>
          <select className='form-control' value={productoId} onChange={e => setProductoId(e.target.value)} required>
            <option value="">Seleccionar Producto</option>
            {productos.map(producto => (
              <option key={producto.id} value={producto.id}>{producto.nombre}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label>Código</label>
          <input type="text" className='form-control' value={codigo} onChange={e => setCodigo(e.target.value)} required />
        </div>
        <button type="submit" className='btn btn-primary mt-3'>Actualizar Producto</button>
      </form>
    </div>
  );
}
