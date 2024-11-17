import { useEffect } from 'react'
import CardFiveDaysDetail from './components/CardFiveDaysDetail'
import CardWeatherDetail from './components/CardWeatherDetail'
import Search from './components/Search'
import { useWeather } from './hook/useWeather'
import CardHighLights from './components/CardHighLights'

function App() {
  const { getCityCoordinates, weatherCity, fiveDaysWeather , airPollution} = useWeather()

  useEffect(() => {
    console.log(weatherCity)
  }, [weatherCity])
  return (
    <>

      <header className='header_container'>
        <h1 >Weather</h1>
        <Search getCityCoordinates={getCityCoordinates} />
      </header>
      <div className='container'>
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <CardWeatherDetail weather={weatherCity} />
          <CardFiveDaysDetail fiveDaysWeather={fiveDaysWeather} />
        </div>
        <CardHighLights airPollution={airPollution} />
      </div>
    </>
  )
}

export default App
