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
  const [errorClima, setErrorClima] = useState(null)


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
            <img className='loading__gif' src='../assets/loading.gif' alt='loading...' />
          </div>
        ) : (
          <div className='app__container' style={bgSytle}>
            <header>
              <h1 className='header__title'>⛅ Weather APP ⛅</h1>
            </header>

            {errorClima || clima ?
              (
                <div>
                  <ClimaCard
                    clima={clima}
                    setBgSelect={setBgSelect}
                    errorClima={errorClima}
                  />
                </div>
              ) : (
                <LocalClimaCard
                  setBgSelect={setBgSelect}
                />
              )}

            <div className='app__search'>
              <h2 className='search__title'>SEARCH COUNTRY</h2>
              <Buscador
                setClima={setClima}
                setErrorClima={setErrorClima}
              />
              <SelectCity
                setClima={setClima}
                setErrorClima={setErrorClima}
                setBgSelect={setBgSelect}
              />
              <p className='search__txt'>If you can't find your city try to search</p>
            </div>
          </div>

        )
      }
    </>
  );
}

export default App
