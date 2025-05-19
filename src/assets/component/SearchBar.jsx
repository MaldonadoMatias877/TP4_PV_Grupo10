import React from 'react';

const SearchBar = ({valorBusqueda, onBusquedaChange}) => {
    return (
        <div className='busqueda'>
            <input 
                type="text" 
                placeholder='Buscar por nombre o por ID'
                value={valorBusqueda}
                onChange={(e) => onBusquedaChange(e.target.value)}
            />
        </div>
    )
}

export default SearchBar;