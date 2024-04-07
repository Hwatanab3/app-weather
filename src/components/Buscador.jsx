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
        <div>
            <input
                type='text'
                placeholder='Search City'
                value={searchValue}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Buscador;