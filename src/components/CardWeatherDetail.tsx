import { useMemo } from "react"
import { Weather } from "../index.ts/type"
import {  formartTemperature, getDayOfWeek } from "../utils/utils"


type CardWeatherDetailProps ={
  weather : Weather
}
function CardWeatherDetail({weather}: CardWeatherDetailProps) {

  const temp= useMemo(()=> weather.main.temp ? formartTemperature(weather.main.temp) : 0, [weather.main.temp])
  const city= useMemo(()=> weather.name ? weather.name + ", "+ weather.sys.country : 'Nombre de la Ciudad' , [weather.name])

  return (
    <div className="cardWeather">
      <p className="cardWeather_element_now">Ahora</p>
      <p className="cardWeather_element_temp">{temp} &deg;C</p>
      <img src={`htthps://openweathermap.org/img/wn/`} alt="" />
      <hr className="cardWeather_element_hr"/>
      <p className="cardWeather_element_date">{getDayOfWeek()}</p>
      <p className="cardWeather_element_city">{city}</p>
    </div>
  )
}

export default CardWeatherDetail