import { useEffect, useState } from 'react';
import './App.css'
import SelectCity from './components/SelectCity.jsx';
import LocalClimaCard from './components/LocalClimaCard.jsx';
import ClimaCard from './components/ClimaCard.jsx';
import Buscador from './components/Buscador.jsx';

function App() {

  const [clima, setClima] = useState(null)
  const [bgSelect, setBgSelect] = useState('01')
  const [isLoading, setIsLoading] = useState(true)

  const bgSytle = {
    backgroundImage: `url(./assets/background/bg${bgSelect}.jpeg)`
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <>
      {
        isLoading ? (
          <div className='loading'>
            <img className='loading__gif' src='../public/assets/loading.gif' alt='loading...' />
          </div>
        ) : (
          <div className='app__container' style={bgSytle}>
            {clima ?
              (
                <div>
                  <ClimaCard
                    clima={clima}
                    setBgSelect={setBgSelect}
                  />
                </div>
              ) : (
                <LocalClimaCard />
              )}

            <div className='app__card'>
              <h1>Weather App</h1>
              <SelectCity
                setClima={setClima}
              />
              <Buscador
                setClima={setClima}
              />
            </div>
          </div>

        )
      }
    </>
  );
}

export default App
