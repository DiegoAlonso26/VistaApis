import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarCategorias() {
    const { id } = useParams();
    const navegacion = useNavigate();
    const [categoria, setCategoria] = useState({
        descripcion: "",
        nombre: "",
        estado: 1
    });

    const { descripcion, nombre } = categoria;

    useEffect(() => {
        cargarCategoria();
    }, []);

    const cargarCategoria = async () => {
        try {
            const resultado = await axios.get(`http://localhost:8081/api-ti/categorias/${id}`);
            setCategoria(resultado.data);
        } catch (error) {
            console.error('Error al cargar la categoría:', error);
        }
    };

    const onInputChange = (e) => {
        setCategoria({ ...categoria, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/api-ti/categorias/${id}`, categoria);
            navegacion('/ListarCategorias');
        } catch (error) {
            console.error('Error al editar categoría:', error);
        }
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Editar Categoría</h3>
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
                    <label htmlFor="nombre" className="form-label">Nombre</label>
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
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
}
