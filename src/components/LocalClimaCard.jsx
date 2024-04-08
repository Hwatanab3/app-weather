import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LocalClimaCard = ({ setBgSelect }) => {
    const [coords, setCoords] = useState()
    const [climaActual, setClimaActual] = useState()
    const [isCel, setIsCel] = useState(true)
    const [name, setName] = useState('Change to °F')
    const [temp, setTemp] = useState()
    const [error, setError] = useState(null)


    const success = (pos) => {
        const obj = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
        }
        setCoords(obj);
    }

    const gestion_error = (err) => {
        let errorMsg;
        switch (err.code) {
            case err.PERMISSION_DENIED:
                errorMsg = 'You have not give me permission 😥';
                break;
            case err.POSITION_UNVAILABLE:
                errorMsg = 'Your position is not available';
                break;
            case err.TIMEOUT:
                errorMsg = 'Time is up, can not know your position';
                break;
            default:
                errorMsg = 'ERROR'
        }
        setError(errorMsg)
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, gestion_error);
    }, [])

    useEffect(() => {
        if (coords) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=93cefc3a3fe37ab93b076dc99c6618f0`;
            axios.get(url)
                .then(res => {
                    const cel = (res.data.main.temp - 273.15).toFixed(2);
                    const fah = (cel * 9 / 5 + 32).toFixed(2);
                    setTemp({ cel, fah })
                    setClimaActual(res.data)
                    setBgSelect(res.data.weather[0].icon);
                })
                .catch(err => console.log(err))
        }
    }, [coords])

    const handleTemp = () => {
        setIsCel(!isCel)
        setName(isCel ? 'Change to °C' : 'Change to °F')
    }



    return (
        <div>
            {error ? (
                <div className='error__container'>
                    <p>{error}</p>
                    <img className='error' src='/assets/error.gif' alt='error' />
                </div>
            ) : (
                <div className='clima__card'>
                    <div className='card__title'>
                        <h2>{climaActual?.name} <span className='title__country'> [{climaActual?.sys.country}]</span></h2>
                        <img
                            src={`https://flagcdn.com/16x12/${climaActual?.sys.country.toLowerCase()}.png`}
                            width="16"
                            height="12"
                            alt="bandera pais"></img>
                    </div>
                    <div className='card__content'>
                        <figure>
                            <img className='content__icon' src={`https://openweathermap.org/img/wn/${climaActual?.weather[0].icon}@2x.png`} alt='' />
                        </figure>
                        <div>
                            <strong>"{climaActual?.weather[0].description}"</strong>
                            <ul>
                                <li><span>Wind speed: </span><span>{climaActual?.wind.speed} m/s</span></li>
                                <li><span>Clouds: </span><span>{climaActual?.clouds.all} %</span></li>
                                <li><span>Pressure: </span><span>{climaActual?.main.pressure} hPa</span></li>
                            </ul>
                        </div>
                    </div>
                    <h2>
                        {
                            isCel ?
                                temp?.cel + ' °C'
                                :
                                temp?.fah + ' °F'
                        }
                    </h2>
                    <button className='btn--temp' onClick={handleTemp}>{name}</button>
                </div>
            )

            }

        </div>
    );
};


export default LocalClimaCard