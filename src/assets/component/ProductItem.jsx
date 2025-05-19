import React from 'react';

const ProductItem = ({ producto, onEditar, onEliminar, onRestaurar, onActivar, listType }) => {
  const rowClass = 
    listType === 'eliminados' ? 'product-item--eliminados' :
    listType === 'inactivos' ? 'product-item--inactivos' :
    '';

  return (
    <div className={`product-item ${rowClass}`}>
      <div className="product-cell">{producto.id}</div>
      <div className="product-cell">{producto.nombre}</div>
      <div className="product-cell">${producto.precio}</div>
      <div className="product-cell">{producto.descuento}%</div>
      <div className="product-cell">
        ${(producto.precio - (producto.precio * producto.descuento) / 100).toFixed(2)}
      </div>
      <div className="product-cell">{producto.stock}</div>
      <div className="product-cell">{producto.activo ? 'Activo' : 'Inactivo'}</div>
      <div className="product-cell">
        {listType === 'activos' && (
          <>
            <button onClick={() => onEditar(producto)}>Editar</button>
            <button onClick={() => onEliminar(producto.id)}>Eliminar</button>
          </>
        )}
        {listType === 'eliminados' && (
          <button onClick={() => onRestaurar(producto.id)}>Restaurar</button>
        )}
        {listType === 'inactivos' && (
          <button onClick={() => onActivar(producto.id)}>Activar</button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;