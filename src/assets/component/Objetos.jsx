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
  });

  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditandoId, setProductoEditandoId] = useState(null);  

  const guardarCambios = () => {
    const actualizados = productos.map((p) =>
      p.id === productoEditandoId ? { ...producto } : p
    );
    setProductos(actualizados);
    setProducto({ id: '', nombre: '', precio: '', descuento: '', stock: '' });
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
    const nuevosProductos = [...productos, nuevoProducto];
    setProductos(nuevosProductos);
    setProducto({ id: '', nombre: '', precio: '', descuento: '', stock: '' });
  };

  // Filtrado con useMemo
  const productosFiltrados = useMemo(() => {
    const valorBuscado = busqueda.toLowerCase();
    return productos.filter((p) =>
      p.id.toLowerCase().includes(valorBuscado) ||
      p.nombre.toLowerCase().includes(valorBuscado)
    );
  }, [productos, busqueda]);

  //Eliminar con useCallback
  const eliminarProducto = useCallback((id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setProductos((prevProductos) =>
        prevProductos.filter((p) => p.id !== id)
      );
    }
  }, []);

  return (
    <div className="contenedor">
      <h2>Agregar Producto</h2>
      <ProductForm
        producto={producto}
        handleChange={handleChange}
        modoEdicion={modoEdicion}
        onSubmit={modoEdicion ? guardarCambios : agregarProducto}
      />

      {/* Barra de búsqueda */}
      <div className="busqueda">
        <input
          type="text"
          placeholder="Buscar por nombre o ID"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <h3>Lista de Productos</h3>
      <ProductList 
        productos={productosFiltrados} 
        onEditar={comenzarEdicion} 
        onEliminar={eliminarProducto}
      />
    </div>
  );
};

export default Objetos;
