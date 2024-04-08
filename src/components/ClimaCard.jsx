import React, { useEffect, useState } from 'react'

const ClimaCard = ({ clima, setBgSelect, errorClima }) => {
    const [isCel, setIsCel] = useState(true)
    const [temp, setTemp] = useState()
    const [name, setName] = useState('Change to °F')



    useEffect(() => {
        const cel = clima.main.temp
        const fah = (cel * 9 / 5 + 32).toFixed(2);
        setTemp({ cel, fah })
        setBgSelect(clima?.weather[0].icon)
    }, [clima])

    const handleTemp = () => {
        setIsCel(!isCel)
        setName(isCel ? 'Change to °C' : 'Change to °F')
    }

    return (
        <div>
            {
                errorClima ? (
                    <div className='error__container'>
                        <p>{errorClima}</p>
                        <img className='error' src='/assets/error_clima.gif' alt='error' />
                    </div>
                ) : (
                    <div className='clima__card'>
                        <div className='card__title'>
                            <h2>{(clima?.name).toUpperCase()} {clima?.sys.country}</h2>
                            <img
                                src={`https://flagcdn.com/16x12/${clima?.sys.country.toLowerCase()}.png`}
                                width="16"
                                height="12"
                                alt="bandera pais"></img>
                        </div>
                        <div className='card__content'>
                            <figure>
                                <img className='content__icon' src={`https://openweathermap.org/img/wn/${clima?.weather[0].icon}@2x.png`} alt='' />
                            </figure>
                            <div>
                                <strong>"{(clima?.weather[0].description).toUpperCase()}"</strong>
                                <ul>
                                    <li><span>Wind speed: </span><span>{clima?.wind.speed} m/s</span></li>
                                    <li><span>Clouds: </span><span>{clima?.clouds.all} %</span></li>
                                    <li><span>Pressure: </span><span>{clima?.main.pressure} hPa</span></li>
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
    )
}

export default ClimaCard