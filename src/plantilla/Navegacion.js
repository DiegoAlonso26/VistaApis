import React from 'react';
import { Link } from 'react-router-dom';
import './Navegacion.css';

export default function Navegacion() {
  return (
    <div className='navegacion-container'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Sistema Proyecto Integrador</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categorías
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/ListarCategorias">Listar</Link></li>
                  <li><Link className="dropdown-item" to="/AgregarCategorias">Agregar</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Lugares
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/ListarLugares">Listar</Link></li>
                  <li><Link className="dropdown-item" to="/AgregarLugares">Agregar</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Almacenes
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/ListadoAlmacenes">Listar</Link></li>
                  <li><Link className="dropdown-item" to="/AgregarAlmacen">Agregar</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sucursales
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/ListadoSucursales">Listar</Link></li>
                  <li><Link className="dropdown-item" to="/AgregarSucursal">Agregar</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Productos
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/ListadoProductos">Listar</Link></li>
                  <li><Link className="dropdown-item" to="/AgregarProducto">Agregar</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
