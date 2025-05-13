import React, { useState, useMemo } from 'react';
import '../styles/objetos.css';
import ProductForm from '../component/modificacionP';

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
      <div className="tabla">
        <div className="encabezado">
          <div>ID</div>
          <div>Nombre</div>
          <div>Precio</div>
          <div>% Descuento</div>
          <div>Precio Final</div>
          <div>Stock</div>
          <div> - </div>
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
              <div>
                <button onClick={() => comenzarEdicion(p)}>Editar</button>
              </div>            
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Objetos;
