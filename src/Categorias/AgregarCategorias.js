import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgregarCategoria() {
    const navegacion = useNavigate();
    const [categoria, setCategoria] = useState({
        descripcion: "",
        nombre: ""
    });

    const { descripcion, nombre } = categoria;

    const onInputChange = (e) => {
        setCategoria({ ...categoria, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/api-ti/categorias", { ...categoria, estado: 1 });
            navegacion('/ListarCategorias');
        } catch (error) {
            console.error('Error al agregar categoría:', error);
        }
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Agregar Categoría</h3>
            </div>
            <form onSubmit={onSubmit}>
            
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre de la Categoria</label>
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
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        </div>
    );
}
