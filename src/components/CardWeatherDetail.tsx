import { useMemo } from "react"
import { Weather } from "../index.ts/type"
import {  formartTemperature, getDayOfWeek } from "../utils/utils"
import { WeatherCity } from "../hook/useWeather"


type CardWeatherDetailProps ={
  weather : WeatherCity
}
function CardWeatherDetail({weather}: CardWeatherDetailProps) {

  const temp= useMemo(()=> weather.main.temp ? formartTemperature(weather.main.temp) : 0, [weather.main.temp])
  const city= useMemo(()=> weather.name ? weather.name + ", "+ weather.sys.country : 'Nombre de la Ciudad' , [weather.name])

  return (
    <div className="cardWeather">
      <p className="cardWeather_element_now">Ahora</p>
      <div className="cardWeather_element_div">
        <p className="cardWeather_element_temp">{temp} &deg;C</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" />
      </div>
      <hr className="cardWeather_element_hr"/>
      <p className="cardWeather_element_date">{getDayOfWeek()}</p>
      <p className="cardWeather_element_city">{city}</p>
    </div>
  )
}

export default CardWeatherDetail