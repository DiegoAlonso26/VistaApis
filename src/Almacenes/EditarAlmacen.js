import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarAlmacen() {
    const { id } = useParams();
    const navegacion = useNavigate();
    const [lugares, setLugares] = useState([]);
    const [almacen, setAlmacen] = useState({
        descripcion: "",
        supervisor: "",
        telefonoSupervisor: "",
        idLugar: ""
    });

    const { descripcion, supervisor, telefonoSupervisor, idLugar } = almacen;

    useEffect(() => {
        cargarAlmacen();
        cargarLugares();
    }, []);

    const cargarAlmacen = async () => {
        try {
            const resultado = await axios.get(`http://localhost:8081/api-ti/almacenes/${id}`);
            setAlmacen(resultado.data);
        } catch (error) {
            console.error('Error al cargar el almacen:', error);
        }
    };

    const cargarLugares = async () => {
        try {
            const resultado = await axios.get("http://localhost:8081/api-ti/lugares");
            setLugares(resultado.data);
        } catch (error) {
            console.error('Error al cargar lugares:', error);
        }
    };

    const onInputChange = (e) => {
        setAlmacen({ ...almacen, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/api-ti/almacenes/${id}`, almacen);
            navegacion('/ListadoAlmacenes');
        } catch (error) {
            console.error('Error al editar almacen:', error);
        }
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Editar Almacen</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="supervisor" className="form-label">Supervisor</label>
                    <input
                        type="text"
                        className="form-control"
                        id="supervisor"
                        name="supervisor"
                        value={supervisor}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefonoSupervisor" className="form-label">Teléfono del Supervisor</label>
                    <input
                        type="text"
                        className="form-control"
                        id="telefonoSupervisor"
                        name="telefonoSupervisor"
                        value={telefonoSupervisor}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="idLugar" className="form-label">Lugar</label>
                    <select
                        className="form-control"
                        id="idLugar"
                        name="idLugar"
                        value={idLugar}
                        onChange={onInputChange}
                        required
                    >
                        <option value="">Seleccionar Lugar</option>
                        {lugares.map(lugar => (
                            <option key={lugar.id} value={lugar.id}>
                                {lugar.distrito}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
}
