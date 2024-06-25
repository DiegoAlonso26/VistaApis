import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import ListadoProveedores from "./proveedores/ListadoProveedores";
import AgregarProveedores from "./proveedores/AgregarProveedores";
import EditarProveedores from "./proveedores/EditarProveedores";
import ListarCompras from "./Compras/ListarCompras";
import AgregarCompras from "./Compras/AgregarCompras";
import EditarCompras from "./Compras/EditarCompras";
import ListadoCategorias from "./Categorias/ListadoCategorias";
import AgregarCategoria from "./Categorias/AgregarCategorias";
import EditarCategorias from "./Categorias/EditarCategorias";
import ListadoLugares from "./Lugares/ListadoLugares";
import EditarLugar from "./Lugares/EditarLugar";
import AgregarLugar from "./Lugares/AgregarLugar"
import ListadoAlmacenes from "./Almacenes/ListadoAlmacen";
import EditarAlmacen from "./Almacenes/EditarAlmacen";
import AgregarAlmacen from "./Almacenes/AgregarAlmacen";
import ListadoSucursales from "./Sucursales/ListadoSucursales"
import EditarSucursal from "./Sucursales/EditarSucursal"
import AgregarSucursal from "./Sucursales/AgregarSucursal"
import ListadoProductos from "./Productos/ListadoProductos";
import EditarProducto from "./Productos/EditarProducto";
import AgregarProducto from "./Productos/AgregarProducto";
import ListadoProductosSucursal from "./ProductosSucursal/ListadoProductosPorSucursal";
import EditarProductoSucursal from "./ProductosSucursal/EditarProductoSucursal";
import AgregarProductoSucursal from "./ProductosSucursal/AgregarProductoSucursal";
import ListadoProductosPorSucursal from "./ProductosSucursal/ListadoProductosPorSucursal";

function App() {
  return (
    <div className="container text-center">
      <BrowserRouter>
      <Navegacion/>
      <Routes>
        <Route exact path="/ListarProveedores" element={<ListadoProveedores/>}/>
        <Route exact path="/AgregarProveedores" element={<AgregarProveedores/>}/>
        <Route exact path="/EditarProveedores/:id" element={<EditarProveedores/>}/>
        <Route exact path="/ListarCompras" element={<ListarCompras/>}/>
        <Route exact path="/AgregarCompras" element={<AgregarCompras/>}/>
        <Route exact path="/EditarCompras/:id" element={<EditarCompras/>}/>
        <Route exact path="/ListarCategorias" element={<ListadoCategorias/>}/>
        <Route exact path="/AgregarCategorias" element={<AgregarCategoria/>}/>
        <Route exact path="/EditarCategorias/:id" element={<EditarCategorias/>}/>
        <Route exact path="/ListarLugares" element={<ListadoLugares/>}/>
        <Route exact path="/EditarLugar/:id" element={<EditarLugar/>}/>
        <Route exact path="/AgregarLugares" element={<AgregarLugar/>}/>
        <Route exact path="/ListadoAlmacenes" element={<ListadoAlmacenes/>}/>
        <Route exact path="/EditarAlmacen/:id" element={<EditarAlmacen/>}/>
        <Route exact path="/AgregarAlmacen" element={<AgregarAlmacen/>}/>
        <Route exact path="/ListadoSucursales" element={<ListadoSucursales/>}/>

        <Route exact path="/EditarSucursal/:id" element={<EditarSucursal/>}/>

        <Route exact path="/AgregarSucursal" element={<AgregarSucursal/>}/>

        <Route exact path="/ListadoProductos" element={<ListadoProductos/>}/>
        <Route exact path="/EditarProducto/:id" element={<EditarProducto/>}/>
        <Route exact path="/AgregarProducto" element={<AgregarProducto/>}/>
        <Route exact path="/productos-sucursal/:id" element={<ListadoProductosSucursal/>}/>

        <Route exact path="/productos-sucursal/:id" element={<ListadoProductosPorSucursal/>}/>
        <Route exact path="/agregar-producto-sucursal/:sucursalId" element={<AgregarProductoSucursal/>}/>


      





      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
