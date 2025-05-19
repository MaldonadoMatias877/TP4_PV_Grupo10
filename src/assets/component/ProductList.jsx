import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ productos, onEditar, onEliminar, onRestaurar, onActivar, listType }) => {
  return (
    <div className='lista-product-list'>
      <div className='product-header'>
        <div className='product-cell'>Id</div>
        <div className='product-cell'>Nombre</div>
        <div className='product-cell'>Precio</div>
        <div className='product-cell'>Descuento</div>
        <div className='product-cell'>Precio con Descuento</div>
        <div className='product-cell'>Stock</div>
        <div className='product-cell'>Estado</div>
        <div className='product-cell'>Acciones</div>
      </div>
      {productos.map((producto) => (
        <ProductItem
          key={producto.id}
          producto={producto}
          onEditar={onEditar}
          onEliminar={onEliminar}
          onRestaurar={onRestaurar}
          onActivar={onActivar}
          listType={listType}
        />
      ))}
    </div>
  );
};

export default ProductList;
