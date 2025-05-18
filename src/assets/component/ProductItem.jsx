import React from 'react';

const ProductItem = ({producto, onEditar, onEliminar}) => {
    const {
        id,
        nombre,
        precio,
        descuento,
        stock,
        estado
    } = producto;

    const precioFinal = (parseFloat(precio)- (parseFloat(precio)*parseFloat(descuento || 0)) /100).toFixed(2);

    return(
        <div className='product-item'>
            <div className='product-cell'>{id}</div>
            <div className='product-cell'>{nombre}</div>
            <div className='product-cell'>${parseFloat(precio).toFixed(2)}</div>
            <div className='product-cell'>{descuento}</div>
            <div className='product-cell'>${precioFinal}</div>
            <div className='product-cell'>{stock}</div>
            <div className='product-cell'>{estado ? 'Activo' : 'Inactivo'}</div>
            <div className='product-cell'>
                <button onClick={() => onEditar(producto)}>Editar</button>
                <button onClick={() => onEliminar(id)}>Eliminar</button>
            </div>
        </div>
    );
};

export default ProductItem;