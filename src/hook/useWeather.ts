import { useState } from "react"
import { FormSearchWeather } from "../index.ts/type"
import { array, InferInput, number, object, parse, string } from "valibot"

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0
  },
  sys: {
    country: '',
  }
}

type CityCoordinates = {
  name: string
  lon: string
  lat: string
  country: string
  state: string
}

interface WeatherForecast {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
}

export type FiveDaysWeather = {
  dt_txt: string,
  main: {
    temp: number;
  }
}
const WeaherSchema = object({
  name: string(),
  main: object({
    temp: number(),
    temp_max: number(),
    temp_min: number()
  }),
  sys: object({
    country: string(),
  }),
  weather: array(object({
    icon: string()
  }))
})

const DaysWeatherSchema = object({
  list: array(object({
    dt_txt: string(),
    main: object({
      temp: number()
    })
  }))
})

export type FiveDaysWeatherType = InferInput<typeof DaysWeatherSchema>


interface WeatherResponse {
  list: WeatherForecast[];
}

export const useWeather = () => {

  const api_key = "69e008d5adbd735836808ebb95bc1f2f"
  const [weather, setWeather] = useState(initialState)
  const [fiveDaysWeather, setFiveDaysWeather] = useState<FiveDaysWeather[]>([])

  const getDetailsWeather = ({ name, lon, lat, country, state }: CityCoordinates) => {
    const forecastsWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`

    // saber la temperatura de un lugar
    fetch(weatherUrl).then(res => res.json()).then(data => {

     
      const result = parse(WeaherSchema, data)
      if (result) {
        setWeather(result)
        console.log(weather)
      }
    }).catch(() => {
      console.log('falled 2')
    })

    // proximos dias

    fetch(forecastsWeatherUrl).then(res => res.json()).then(data => {

   
      const responseFiveDaysWeather = parse(DaysWeatherSchema, data)
      if (responseFiveDaysWeather) {

        const uniqueF: number[] = [];
        const filteredDays = responseFiveDaysWeather.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (uniqueF.length < 5) {
            if (!uniqueF.includes(forecastDate)) {
              uniqueF.push(forecastDate);
              return true;
            }
          }
          return false;
        });

        setFiveDaysWeather(filteredDays)
       
      }


    }).catch(() => {
      console.log('falled 2')
    })

  }
  const getCityCoordinates = (formData: FormSearchWeather) => {
    const { city } = formData
    
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`
    fetch(url).then(res => res.json()).then(data => {
      const { name, lon, lat, country, state } = data[0]
      getDetailsWeather({ name, lon, lat, country, state })
    }).catch(() => {
      console.log('falled')
    })

  }


  return { getCityCoordinates, weather, fiveDaysWeather }
}