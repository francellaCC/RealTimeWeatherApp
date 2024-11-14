import { useMemo } from "react"
import { Weather } from "../index.ts/type"
import { formartTemperature, getDayOfWeek } from "../utils/utils"
import { WeatherCity } from "../hook/useWeather"


type CardWeatherDetailProps = {
  weatherCity: WeatherCity
}
function CardWeatherDetail({ weatherCity }: CardWeatherDetailProps) {

  const temp = useMemo(() => weatherCity.main.temp ? formartTemperature(weatherCity.main.temp) : 0, [weatherCity.main.temp])
  const city = useMemo(() => weatherCity.name ? weatherCity.name + ", " + weatherCity.sys.country : 'Nombre de la Ciudad', [weatherCity.name])

  return (
    <div className="cardWeather">
      <p className="cardWeather_element_now">Ahora</p>
      <div className="cardWeather_element_div">
        <p className="cardWeather_element_temp">{temp} &deg;C</p>
        <img src={`https://openweathermap.org/img/wn/${weatherCity.weather[0].icon}.png`} alt="" />
      </div>
      <hr className="cardWeather_element_hr" />
      <p className="cardWeather_element_date">{getDayOfWeek()}</p>
      <p className="cardWeather_element_city">{city}</p>
    </div>
  )
}

export default CardWeatherDetail