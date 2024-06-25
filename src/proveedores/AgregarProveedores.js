import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AgregarProveedores() {
    let navegacion = useNavigate();
    const [proveedores, setProveedores] = useState({
        nombre: "",
        direccion: "",
        telefono: ""
    })

    const{nombre, direccion, telefono} = proveedores
    const onInputChange = (e) => {
        setProveedores({...proveedores, [e.target.name]: e.target.value})
    }

     const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8081/api-ti/proveedores"
        await axios.post(urlBase, proveedores);
        //Redirigir a la pagina principal 
        navegacion('/ListarProveedores');

     }




  return (
    <div className='container'>
        <div classNameName='container text-center' style={{margin: "30px"}}>
            <h3>Agregas Proveedor</h3>
        </div>
    <form onSubmit={(e) => onSubmit(e)}>
  <div className="mb-3">
    <label htmlFor="nombre" className="form-label">Nombre</label>
    <input type="text" className="form-control" id="nombre" name='nombre' required={true}
      value={nombre} onChange={ (e) =>onInputChange(e)}/>
  </div>

  <div className="mb-3">
    <label htmlFor="direccion" className="form-label">Direccion</label>
    <input type="text" className="form-control" id="direccion" name='direccion' required={true}
    value={direccion} onChange={ (e) =>onInputChange(e)}/>
  </div>

  <div className="mb-3">
    <label htmlFor="telefono" className="form-label">Telefono</label>
    <input type="text" className="form-control" id="telefono" name='telefono' required={true}
     value={telefono} onChange={ (e) =>onInputChange(e)}/>
  </div>

  <div className='text-center'>
    <button type="submit" className="btn btn-warning btn-sm me-3">Agregar</button>
    <a href='/ListarProveedores' className='btn btn-danger btn-sm'>Regresar</a>

  </div>
  
    </form>
        
        

        
    </div>
  )
}
