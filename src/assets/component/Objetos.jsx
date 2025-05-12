import React, { useState, useMemo } from 'react';
import '../styles/objetos.css';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
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

    console.log('Productos:', nuevosProductos);
  };

  // Filtrado con useMemo
  const productosFiltrados = useMemo(() => {
    const valorBuscado = busqueda.toLowerCase();

    console.log('id o nombre: ', valorBuscado);

    return productos.filter((p) =>
      p.id.toLowerCase().includes(valorBuscado) ||
      p.nombre.toLowerCase().includes(valorBuscado)
    );
  }, [productos, busqueda]);

  return (
    <div className="contenedor">
      <h2>Agregar Producto</h2>
      <div className="formulario">
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={producto.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
        />
        <input
          type="number"
          name="descuento"
          placeholder="% Descuento"
          value={producto.descuento}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={producto.stock}
          onChange={handleChange}
        />
        <button onClick={agregarProducto}>Agregar</button>
      </div>

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
      <div className="tabla">
        <div className="encabezado">
          <div>ID</div>
          <div>Nombre</div>
          <div>Precio</div>
          <div>% Descuento</div>
          <div>Precio Final</div>
          <div>Stock</div>
        </div>
        {productosFiltrados.map((p, index) => {
          const precioOriginal = parseFloat(p.precio);
          const descuento = parseFloat(p.descuento) || 0;
          const precioFinal = precioOriginal - (precioOriginal * descuento) / 100;

          return (
            <div key={index} className="fila">
              <div>{p.id}</div>
              <div>{p.nombre}</div>
              <div>${precioOriginal.toFixed(2)}</div>
              <div>{descuento}%</div>
              <div>${precioFinal.toFixed(2)}</div>
              <div>{p.stock}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Objetos;
