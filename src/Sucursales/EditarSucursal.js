import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarSucursal() {
    const { id } = useParams();
    const navegacion = useNavigate();
    const [lugares, setLugares] = useState([]);
    const [sucursal, setSucursal] = useState({
        representante: "",
        nombre: "",
        telefono: "",
        horaApertura: "",
        idLugar: ""
    });

    const { representante, nombre, telefono, horaApertura, idLugar } = sucursal;

    useEffect(() => {
        cargarLugares();
        cargarSucursal();
    }, []);

    const cargarLugares = async () => {
        try {
            const resultado = await axios.get("http://ti.app.informaticapp.com:4181/api-ti/lugares");
            setLugares(resultado.data);
        } catch (error) {
            console.error('Error al cargar lugares:', error);
        }
    };

    const cargarSucursal = async () => {
        try {
            const resultado = await axios.get(`http://ti.app.informaticapp.com:4181/api-ti/sucursales/${id}`);
            setSucursal({
                representante: resultado.data.representante,
                nombre: resultado.data.nombre,
                telefono: resultado.data.telefono,
                horaApertura: resultado.data.horaApertura, // Usar directamente la hora sin milisegundos
                idLugar: resultado.data.lugar.id.toString()
            });
        } catch (error) {
            console.error('Error al cargar la sucursal:', error);
        }
    };

    const onInputChange = (e) => {
        setSucursal({ ...sucursal, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const sucursalActualizada = {
                representante,
                nombre,
                telefono,
                horaApertura, // Usar directamente la hora sin milisegundos
                lugar: { id: parseInt(idLugar) }
            };
            await axios.put(`http://ti.app.informaticapp.com:4181/api-ti/sucursales/${id}`, sucursalActualizada);
            navegacion('/ListadoSucursales');
        } catch (error) {
            console.error('Error al editar la sucursal:', error);
        }
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Editar Sucursal</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="representante" className="form-label">Representante</label>
                    <input
                        type="text"
                        className="form-control"
                        id="representante"
                        name="representante"
                        value={representante}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono Representante</label>
                    <input
                        type="text"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        value={telefono}
                        onChange={onInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre Sucursal</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        onChange={onInputChange}
                        required
                    />
                </div>
             
             
                <div className="mb-3">
                    <label htmlFor="idLugar" className="form-label">Ciudad</label>
                    <select
                        className="form-control"
                        id="idLugar"
                        name="idLugar"
                        value={idLugar}
                        onChange={onInputChange}
                        required
                    >
                        <option value="">Selecciona la ciudad</option>
                        {lugares.map(lugar => (
                            <option key={lugar.id} value={lugar.id}>
                                {lugar.provincia}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
}
