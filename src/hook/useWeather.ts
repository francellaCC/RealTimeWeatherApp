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
  },
  weather: [
    {
      icon: ''
    }
  ]
}


type CityCoordinates = {
  name: string
  lon: string
  lat: string
  country: string
  state: string
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

const AirPullutionSchema = object({
  list: array(object({
    components: object({
      co: number(),
      nh3: number(),
      no: number(),
      no2: number(),
      o3: number(),
      pm10: number(),
      pm2_5: number(),
      so2: number()
    })
  }))
})

export type FiveDaysWeatherType = InferInput<typeof DaysWeatherSchema>

export type WeatherCity = InferInput<typeof WeaherSchema>
export type AirPullution = InferInput<typeof AirPullutionSchema>

export const useWeather = () => {

  const api_key = "69e008d5adbd735836808ebb95bc1f2f"
  const [weatherCity, setWeather] = useState(initialState)
  const [fiveDaysWeather, setFiveDaysWeather] = useState<FiveDaysWeather[]>([])
  const [airPollution, setAirPollution] = useState<AirPullution>()


  async function getDetailsWeather({ name, lon, lat, country, state }: CityCoordinates) {
    const forecastsWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const air_pollution = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;

    try {
      // Saber la temperatura de un lugar
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
      const result = parse(WeaherSchema, weatherData);

      console.log("result", result)
      if (result) {
        setWeather(result);
      }

      const result2 = await fetch(air_pollution)
      const data = await result2.json()
      const resultData = parse(AirPullutionSchema, data)

      setAirPollution(resultData)

      // Próximos días
      const forecastsResponse = await fetch(forecastsWeatherUrl);
      const forecastsData = await forecastsResponse.json();
      const responseFiveDaysWeather = parse(DaysWeatherSchema, forecastsData);

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

        setFiveDaysWeather(filteredDays);
      }
    } catch (error) {
      console.log('Falló la solicitud');
    }
  }

  async function getCityCoordinates(formData: FormSearchWeather) {
    const { city } = formData;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const { name, lon, lat, country, state } = data[0];

      // Llama a getDetailsWeather usando await
      await getDetailsWeather({ name, lon, lat, country, state });
    } catch (error) {
      console.log('Falló la solicitud de coordenadas');
    }
  }

  return { getCityCoordinates, weatherCity, fiveDaysWeather , airPollution}
}