import { useMemo } from 'react'
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
  const { getCityCoordinates, getUserCoordinate, weatherCity, fiveDaysWeather, airPollution, hourlyForescat } = useWeather()

  const sunrise = moment.utc(weatherCity.sys.sunrise, "X").add(weatherCity.timezone, 'seconds').format('hh:mm A')
  const sunset = moment.utc(weatherCity.sys.sunset, "X").add(weatherCity.timezone, 'seconds').format('hh:mm A')
  const feelsLike = useMemo(() => weatherCity.main.feels_like ? formartTemperature(weatherCity.main.feels_like) : 0, [weatherCity.main.feels_like])

  return (
    <>

      <header className='header_container'>
        <h1 >Weather</h1>
        <Search getCityCoordinates={getCityCoordinates} getUserCoordinate={getUserCoordinate} />
      </header>
      <div className='container'>
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <CardWeatherDetail weather={weatherCity} />
          <CardFiveDaysDetail fiveDaysWeather={fiveDaysWeather} />
        </div>

        <div>
          <CardHighLights airPollution={airPollution} />

          <div className='weatherDetails'>
            <WeatherDetails label='Humedad' icon={0} valor={weatherCity.main.humidity} text="%" />
            <WeatherDetails label='Presión' icon={2} valor={weatherCity.main.pressure} text='hPa' />
            <WeatherDetails label='Vicibilidad' icon={4} valor={weatherCity.visibility / 1000} text='km' />
            <WeatherDetails label='Velocidad del aire' icon={3} valor={weatherCity.wind.speed} text='m/s' />
            <WeatherDetails label='Sensacion termica' icon={1} valor={feelsLike} text='&deg;C' />
          </div>

        </div>
        <div>
          <CardSunrisetSunset sunrise={sunrise} sunset={sunset} />
          <div className='hourlyForescat'>
            <h2>Para hoy</h2>
            <div className='container_hourlyForescat'>
              {
                hourlyForescat.map((item, index) => (
                  <CardTodayAt key={index} hourlyForescat={item} />
                ))
              }
            </div>

          </div>
        </div>

      </div>


    </>
  )
}

export default App
