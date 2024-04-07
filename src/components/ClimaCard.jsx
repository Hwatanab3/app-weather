import React, { useEffect, useState } from 'react'

const ClimaCard = ({ clima, setBgSelect }) => {
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
            <div>
                <h2>{clima?.name}</h2>
                <div>
                    <figure>
                        <img src={`https://openweathermap.org/img/wn/${clima?.weather[0].icon}@2x.png`} alt='' />
                    </figure>
                    <div>
                        <strong>"{clima?.weather[0].description}"</strong>
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
                <button onClick={handleTemp}>{name}</button>
            </div>
        </div>
    )
}

export default ClimaCard

// < h2 > { clima.name } | { clima.sys.country }</ >
//           <h2>Actual temperature: {clima.main.temp} °C</h2>
//           <p>Min: {clima.main.temp_min} °C</p>
//           <p>Max: {clima.main.temp_max} °C</p>
//           <img src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`} alt='icono del clima' />
