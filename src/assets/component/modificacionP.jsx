import React from 'react';

const ProductForm = ({ producto, handleChange, modoEdicion, onSubmit }) => {
  return (
    <div className="formulario">
      <input
        type="text"
        name="id"
        placeholder="ID"
        value={producto.id}
        onChange={handleChange}
        disabled={modoEdicion} // Deshabilita el ID cuando editas
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
      <button onClick={onSubmit}>
        {modoEdicion ? 'Guardar Cambios' : 'Agregar'}
      </button>
    </div>
  );
};

export default ProductForm;