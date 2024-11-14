import CardFiveDaysDetail from './components/CardFiveDaysDetail'
import CardWeatherDetail from './components/CardWeatherDetail'
import Search from './components/Search'
import { useWeather } from './hook/useWeather'

function App() {
  const {getCityCoordinates, weatherCity, fiveDaysWeather} = useWeather()

  return (
    <div className='container'>
      <header className='header_container'>
        <h1 >Weather</h1>
        <Search getCityCoordinates ={getCityCoordinates} />
      </header>
      <div>
        <CardWeatherDetail weatherCity={weatherCity} />
        <CardFiveDaysDetail fiveDaysWeather={fiveDaysWeather}/>
      </div>
    </div>
  )
}

export default App
