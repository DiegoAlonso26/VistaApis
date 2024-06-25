import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <Link className="nav-link" to="/">
              <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
              Dashboard
            </Link>
            <div className="sb-sidenav-menu-heading">Modulos</div>
            <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseLayouts"
              aria-expanded="false" aria-controls="collapseLayouts">
              <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
              Ventas
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </Link>
            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="#">Lista Ventas</Link>
                <Link className="nav-link" to="#">Registrar Venta</Link>
                <Link className="nav-link" to="#">Detalle Venta</Link>
                <Link className="nav-link" to="#">Clientes</Link>
              </nav>
            </div>
            <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages"
              aria-expanded="false" aria-controls="collapsePages">
              <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
              Compras
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </Link>
            <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#pagesCollapseAuth"
                  aria-expanded="false" aria-controls="pagesCollapseAuth">
                  Lista Compras
                  <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to="#">Registar compra</Link>
                    <Link className="nav-link" to="#">Compras</Link>
                    <Link className="nav-link" to="#">Detalles Compras</Link>
                  </nav>
                </div>
                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#pagesCollapseError"
                  aria-expanded="false" aria-controls="pagesCollapseError">
                  Proveedores
                  <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to="#">Registrar Proveedor</Link>
                    <Link className="nav-link" to="#">Proveedores</Link>
                  </nav>
                </div>
              </nav>
            </div>
            <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#almacen"
              aria-expanded="false" aria-controls="collapseLayouts">
              <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
              Almacen
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </Link>
            <div className="collapse" id="almacen" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/ListadoProductos">Productos</Link>
                <Link className="nav-link" to="/ListadoSucursales">Sucursales</Link>
                <Link className="nav-link" to="/ListarCategorias">Categorias</Link>
                <Link className="nav-link" to="/ListarLugares">Lugar</Link>
              </nav>
            </div>
            <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#devoluciones"
              aria-expanded="false" aria-controls="collapseLayouts">
              <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
              Devoluciones
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </Link>
            <div className="collapse" id="devoluciones" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="#">Lista Devoluciones</Link>
                <Link className="nav-link" to="#">Garantias</Link>
              </nav>
            </div>
            <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#reportes"
              aria-expanded="false" aria-controls="collapseLayouts">
              <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
              Reportes
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </Link>
            <div className="collapse" id="reportes" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="#">Lista reportes</Link>
                <Link className="nav-link" to="#">Reportes Ventas</Link>
              </nav>
            </div>
            <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#seguridad"
              aria-expanded="false" aria-controls="collapseLayouts">
              <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
              Seguridad
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </Link>
            <div className="collapse" id="seguridad" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/usuarios.php">Usuarios</Link>
                <Link className="nav-link" to="#">Perfiles</Link>
                <Link className="nav-link" to="#">Accesos</Link>
                <Link className="nav-link" to="#">Modulos</Link>
              </nav>
            </div>
            <div className="sb-sidenav-menu-heading">Complementos</div>
            <Link className="nav-link" to="#">
              <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
              Gráficos
            </Link>
            <Link className="nav-link" to="#">
              <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
              Tablas
            </Link>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">BIENVENIDO</div>
        </div>
      </nav>
    </div>
  );
}
