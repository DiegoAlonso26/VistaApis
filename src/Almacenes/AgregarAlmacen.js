import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgregarAlmacen() {
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
        cargarLugares();
    }, []);

    const cargarLugares = async () => {
        try {
            const resultado = await axios.get("http://ti.app.informaticapp.com:4181/api-ti/lugares");
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
            const nuevoAlmacen = {
                descripcion,
                supervisor,
                telefonoSupervisor,
                lugar: { id: parseInt(idLugar) }
            };
            await axios.post("http://ti.app.informaticapp.com:4180/api-ti/almacenes", nuevoAlmacen);

            //http://ti.app.informaticapp.com:4169/api-ti/almacenes
            navegacion('/ListadoAlmacenes');
        } catch (error) {
            console.error('Error al agregar almacen:', error);
        }
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Agregar Almacen</h3>
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
                    <label htmlFor="idLugar" className="form-label">Ciudad</label>
                    <select
                        className="form-control"
                        id="idLugar"
                        name="idLugar"
                        value={idLugar}
                        onChange={onInputChange}
                        required
                    >
                        <option value="">Seleccionar Ciudad</option>
                        {lugares.map(lugar => (
                            <option key={lugar.id} value={lugar.id}>
                                {lugar.distrito}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        </div>
    );
}
