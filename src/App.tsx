import { useEffect, useMemo } from 'react'
import CardFiveDaysDetail from './components/CardFiveDaysDetail'
import CardWeatherDetail from './components/CardWeatherDetail'
import Search from './components/Search'
import { useWeather } from './hook/useWeather'
import CardHighLights from './components/CardHighLights'
import CardSunrisetSunset from './components/CardSunrisetSunset'
import moment from 'moment'
import WeatherDetails from './components/WeatherDetails'
import { formartTemperature } from './utils/utils'
import CardTodayAt from './components/CardTodayAt'

function App() {
  const { getCityCoordinates, weatherCity, fiveDaysWeather, airPollution, hourlyForescat } = useWeather()

  const sunrise = moment.utc(weatherCity.sys.sunrise, "X").add(weatherCity.timezone, 'seconds').format('hh:mm A')
  const sunset = moment.utc(weatherCity.sys.sunset, "X").add(weatherCity.timezone, 'seconds').format('hh:mm A')
  const feelsLike = useMemo(() => weatherCity.main.feels_like ? formartTemperature(weatherCity.main.feels_like) : 0, [weatherCity.main.feels_like])

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

        <div>
          <CardHighLights airPollution={airPollution} />

          <div className='weatherDetails'>
            <WeatherDetails label='Humedad' valor={weatherCity.main.humidity} icon='%' />
            <WeatherDetails label='Sensacion termica' valor={feelsLike} icon='&deg;C' />
            <WeatherDetails label='Humedad' valor={weatherCity.main.pressure} icon='hPa' />
            <WeatherDetails label='Humedad' valor={weatherCity.wind.speed} icon='m/s' />
            <WeatherDetails label='Velocidad del aire' valor={weatherCity.visibility / 1000} icon='km' />
          </div>

        </div>
        <div>
          <CardSunrisetSunset sunrise={sunrise} sunset={sunset} />
          <div className='hourlyForescat'>
            <p>Para hoy</p>
            {
              hourlyForescat.map(item => (
                <CardTodayAt hourlyForescat={item} />
              ))
            }
          </div>
        </div>

      </div>


    </>
  )
}

export default App
