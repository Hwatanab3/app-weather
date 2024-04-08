import React, { useState } from 'react';
import { getCiudadClima } from '../services/clima';

const Buscador = ({ setClima, setErrorClima }) => {
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = async () => {
        try {
            if (searchValue.trim() !== '') {
                const climaData = await getCiudadClima(searchValue);
                setClima(climaData);
                setErrorClima(null)
                setSearchValue('')
            }
        } catch (error) {
            console.error('not found it', error);
            if (error.response && error.response.status === 404) {
                setErrorClima('I did not find the city try to search')
            } else {
                setErrorClima('Error')
            }
            setSearchValue('')
        }
    };

    const handleInputChange = e => {
        setSearchValue(e.target.value);
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className='search'>
            <input className='search__input'
                type='text'
                placeholder='Search City'
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button className='btn--search' onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Buscador;