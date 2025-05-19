import React, { useState, useMemo, useCallback } from 'react';
import '../styles/objetos.css';
import ProductForm from '../component/modificacionP';
import ProductList from '../component/ProductList';

const Objetos = () => {
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: '',
    descuento: '',
    stock: '',
    activo: true,
  });

  const [productos, setProductos] = useState([]);
  const [productosInactivos, setProductosInactivos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditandoId, setProductoEditandoId] = useState(null);
  const [mostrarEliminados, setMostrarEliminados] = useState(false);
  const [mostrarInactivos, setMostrarInactivos] = useState(false);

  const guardarCambios = () => {
    const actualizados = productos.map((p) =>
      p.id === productoEditandoId ? { ...producto } : p
    );
    setProductos(actualizados);
    setProducto({ id: '', nombre: '', precio: '', descuento: '', stock: '', activo: true });
    setModoEdicion(false);
    setProductoEditandoId(null);
  };

  const comenzarEdicion = (p) => {
    setProducto({ ...p });
    setModoEdicion(true);
    setProductoEditandoId(p.id);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto({
      ...producto,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const agregarProducto = () => {
    if (
      !producto.id ||
      !producto.nombre ||
      !producto.precio ||
      producto.descuento === '' ||
      producto.stock === ''
    ) {
      alert('Por favor completa todos los campos.');
      return;
    }
    const nuevoProducto = { ...producto };
    if (nuevoProducto.activo) {
      setProductos(prevProductos => [...prevProductos, nuevoProducto]);
    } else {
      setProductosInactivos(prevInactivos => [...prevInactivos, nuevoProducto]);
    }
    setProducto({ id: '', nombre: '', precio: '', descuento: '', stock: '', activo: true });
  };

  const eliminarProducto = useCallback((id) => {
    if (confirm('¿Estás seguro de eliminar este producto visualmente?')) {
      setProductos((prevProductos) =>
        prevProductos.map((p) => (p.id === id ? { ...p, activo: false } : p))
      );
    }
  }, []);

  const restaurarProducto = useCallback((id) => {
    setProductos((prevProductos) =>
      prevProductos.map((p) => (p.id === id ? { ...p, activo: true } : p))
    );
  }, []);

  const activarProducto = useCallback((id) => {
    const productoParaActivar = productosInactivos.find(p => p.id === id);
    if (productoParaActivar) {
      setProductos(prevProductos => [...prevProductos, { ...productoParaActivar, activo: true }]);
      setProductosInactivos(prevInactivos => prevInactivos.filter(p => p.id !== id));
    }
  }, [productosInactivos]);

  const productosFiltrados = useMemo(() => {
    const valorBuscado = busqueda.toLowerCase();
    return productos.filter(
      (p) =>
        p.activo &&
        (p.id.toLowerCase().includes(valorBuscado) || p.nombre.toLowerCase().includes(valorBuscado))
    );
  }, [productos, busqueda]);

  const productosEliminados = useMemo(() => {
    const valorBuscado = busqueda.toLowerCase();
    return productos.filter(
      (p) =>
        !p.activo &&
        (p.id.toLowerCase().includes(valorBuscado) || p.nombre.toLowerCase().includes(valorBuscado))
    );
  }, [productos, busqueda]);

  const productosInactivosFiltrados = useMemo(() => {
    const valorBuscado = busqueda.toLowerCase();
    return productosInactivos.filter(
      (p) =>
        (p.id.toLowerCase().includes(valorBuscado) || p.nombre.toLowerCase().includes(valorBuscado))
    );
  }, [productosInactivos, busqueda]);

  return (
    
   <div className="contenedor">
  <div className="formulario-wrapper">
    <div className="formulario-contenedor">
      <h2>Agregar Producto</h2>
      <ProductForm
        producto={producto}
        handleChange={handleChange}
        modoEdicion={modoEdicion}
        onSubmit={modoEdicion ? guardarCambios : agregarProducto}
      />
    </div>
  </div>

  <div className="lista-wrapper">
    <div className="busqueda">
      <input
        type="text"
        placeholder="Buscar por nombre o ID"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>

    <div className="lista-container">
      <h3>Lista de Productos</h3>
      <ProductList
        productos={productosFiltrados}
        onEditar={comenzarEdicion}
        onEliminar={eliminarProducto}
        listType="activos"
      />
    </div>

    <button onClick={() => setMostrarEliminados(!mostrarEliminados)}>
      {mostrarEliminados ? 'Ocultar Productos Eliminados' : 'Mostrar Productos Eliminados'}
    </button>

    {mostrarEliminados && (
      <div className="lista-container">
        <h3>Productos Eliminados</h3>
        {productosEliminados.length > 0 ? (
          <ProductList
            productos={productosEliminados}
            onEditar={comenzarEdicion}
            onEliminar={eliminarProducto}
            onRestaurar={restaurarProducto}
            listType={"eliminados"}
          />
        ) : (
          <p>No hay productos eliminados.</p>
        )}
      </div>
    )}

    <button onClick={() => setMostrarInactivos(!mostrarInactivos)}>
      {mostrarInactivos ? 'Ocultar Productos Inactivos' : 'Mostrar Productos Inactivos'}
    </button>

    {mostrarInactivos && (
      <div className="lista-container">
        <h3>Productos Inactivos</h3>
        {productosInactivosFiltrados.length > 0 ? (
          <ProductList
            productos={productosInactivosFiltrados}
            onActivar={activarProducto}
            listType="inactivos"
          />
        ) : (
          <p>No hay productos inactivos.</p>
        )}
      </div>
    )}
  </div>
</div>
  );
};

export default Objetos;