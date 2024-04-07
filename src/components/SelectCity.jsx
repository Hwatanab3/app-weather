import React, { useEffect, useState } from 'react'
import { getPaises } from '../services/getPaises'
import { getEstados } from '../services/getEstados'
import { getCiudades } from '../services/getCiudades'
import { getCiudadClima } from '../services/clima'
import { getAuth } from '../services/getAuth'

const SelectCity = ({ setClima }) => {
    const [paises, setPaises] = useState([])
    const [estados, setEstados] = useState([])
    const [ciudades, setCiudades] = useState([])
    const [authData, setAuthData] = useState(null)

    useEffect(() => {
        const fetchAuthData = async () => {
            try {
                const response = await getAuth();
                setAuthData(response.auth_token);
            } catch (error) {
                console.error('error', error)
            }
        };
        fetchAuthData();
    }, []);

    useEffect(() => {
        const fetchPaises = async () => {
            try {
                if (authData) {
                    const fetchedPaises = await getPaises(authData);
                    fetchedPaises.sort((a, b) => {
                        if (a.country_name < b.country_name) {
                            return -1;
                        }
                        if (a.country_name > b.country_name) {
                            return 1;
                        }
                        return 0;
                    });
                    setPaises(fetchedPaises)
                }
            } catch (error) {
                console.error('error 2', error);
            }
        };
        fetchPaises();
    }, [authData]);

    const paisHandler = async e => {
        e.currentTarget.value && setEstados([]);
        e.currentTarget.value && setCiudades([]);
        e.currentTarget.value && setEstados(await getEstados(e.currentTarget.value, authData));
        setClima(null);
    };

    const estadoHandler = async e => {
        e.currentTarget.value && setCiudades([]);
        e.currentTarget.value && setCiudades(await getCiudades(e.currentTarget.value, authData));
        setClima(null);
    };

    const ciudadHandler = async e => {
        e.currentTarget.value && setClima(await getCiudadClima(e.currentTarget.value));
    };

    return (
        <div className='select__container'>
            <div>
                <select className='select' onChange={paisHandler}>
                    <option value="">Elige un pais</option>
                    {paises.map(pais => <option key={pais.country_short_name} value={pais.country_name}>{pais.country_name}</option>)}
                </select>

            </div>

            {estados.length > 0 && (
                <div>
                    <select className='select' onChange={estadoHandler}>
                        <option value="">Elige un estado</option>
                        {estados.map(estado => <option key={estado.state_name} value={estado.state_name}>{estado.state_name}</option>)}
                    </select>
                </div>)}

            {ciudades.length > 0 && (
                <div>
                    <select className='select' onChange={ciudadHandler}>
                        <option value="">Elige una ciudad</option>
                        {ciudades.map((ciudad, index) => <option key={index} value={ciudad.city_name}>{ciudad.city_name}</option>)}
                    </select>
                </div>)}
        </div>
    )
}

export default SelectCity