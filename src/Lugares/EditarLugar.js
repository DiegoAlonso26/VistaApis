import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarLugar() {
    const { id } = useParams();
    const navegacion = useNavigate();
    const [lugar, setLugar] = useState({
        codigoPostal: "",
        pais: "",
        region: "",
        distrito: "",
        provincia: "",
        direccionEspecifica: ""
    });

    const { codigoPostal, pais, region, distrito, provincia, direccionEspecifica } = lugar;

    useEffect(() => {
        cargarLugar();
    }, []);

    const cargarLugar = async () => {
        try {
            const resultado = await axios.get(`http://ti.app.informaticapp.com:4181/api-ti/lugares/${id}`);
            setLugar(resultado.data);
        } catch (error) {
            console.error('Error al cargar el lugar:', error);
        }
    };

    const onInputChange = (e) => {
        setLugar({ ...lugar, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://ti.app.informaticapp.com:4181/api-ti/lugares/${id}`, lugar);
            navegacion('/ListarLugares');
        } catch (error) {
            console.error('Error al editar lugar:', error);
        }
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Editar Lugar</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="codigoPostal" className="form-label">Código Postal</label>
                    <input
                        type="text"
                        className="form-control"
                        id="codigoPostal"
                        name="codigoPostal"
                        value={codigoPostal}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pais" className="form-label">País</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pais"
                        name="pais"
                        value={pais}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="region" className="form-label">Región</label>
                    <input
                        type="text"
                        className="form-control"
                        id="region"
                        name="region"
                        value={region}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="distrito" className="form-label">Distrito</label>
                    <input
                        type="text"
                        className="form-control"
                        id="distrito"
                        name="distrito"
                        value={distrito}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="provincia" className="form-label">Provincia</label>
                    <input
                        type="text"
                        className="form-control"
                        id="provincia"
                        name="provincia"
                        value={provincia}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccionEspecifica" className="form-label">Dirección Específica</label>
                    <input
                        type="text"
                        className="form-control"
                        id="direccionEspecifica"
                        name="direccionEspecifica"
                        value={direccionEspecifica}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
}
