import React, { useState } from 'react';
import { getCiudadClima } from '../services/clima';

const Buscador = ({ setClima }) => {
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = async () => {
        if (searchValue.trim() !== '') {
            const climaData = await getCiudadClima(searchValue);
            setClima(climaData);
        }
    };

    const handleInputChange = e => {
        setSearchValue(e.target.value);
    };

    return (
        <div className='search'>
            <input className='search__input'
                type='text'
                placeholder='Search City'
                value={searchValue}
                onChange={handleInputChange}
            />
            <button className='btn--search' onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Buscador;