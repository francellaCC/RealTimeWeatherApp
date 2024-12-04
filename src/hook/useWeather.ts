import { useState } from "react"
import { FormSearchWeather } from "../index.ts/type"
import { array, InferInput, number, object, parse, string } from "valibot"

const initialState = {
  name: '',
  main: {
    temp: 0,
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    temp_max: 0,
    temp_min: 0
  },
  sys: { country: "", sunrise: 0, sunset: 0 },
  timezone: 0,
  visibility: 0,
  weather: [
    {
      icon: ''
    }
  ],
  wind: {
    speed: 0
  }
}

const initialHourlyForescat = [
  {
    hr: 3,
    hora: "AM",
    icon: "04d",
    temp: 0
  }
]

type CityCoordinates = {

  lon: string
  lat: string
  
}

export type FiveDaysWeather = {
  dt_txt: string;  // Fecha y hora de la predicción
  main: {
    temp: number;  // Temperatura
  };
  weather:  // Aquí se espera una tupla con un solo objeto que tiene un `icon`
  {
    icon: string;  // Ícono del clima
  }[]
  ;
};
const WeaherSchema = object({
  name: string(),
  main: object({
    temp: number(),
    feels_like: number(),
    humidity: number(),
    pressure: number(),
    temp_max: number(),
    temp_min: number()
  }),
  sys: object({
    country: string(),
    sunrise: number(),
    sunset: number()
  }),
  timezone: number(),
  visibility: number(),
  weather: array(object({
    icon: string()
  })),
  wind: object({
    speed: number()
  })
})

const DaysWeatherSchema = object({
  list: array(object({
    dt_txt: string(),
    main: object({
      temp: number()
    }),
    weather: array(object({
      icon: string()
    }))
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
    }),
    main: object({
      aqi: number()
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
  const [hourlyForescat, setHourlyForescat] = useState<{ hr: number; hora: string, icon: string, temp: number }[]>(initialHourlyForescat)


  async function getDetailsWeather({ lon, lat }: CityCoordinates) {
    const forecastsWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const air_pollution = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;

    try {
      // Saber la temperatura de un lugar
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
      const result = parse(WeaherSchema, weatherData);

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

        const hourly = []
        for (let index = 0; index <= 7; index++) {
          const hourlyForecasts = new Date(responseFiveDaysWeather.list[index].dt_txt)
          const temp = responseFiveDaysWeather.list[index].main.temp
          let hr = hourlyForecasts.getHours()
          let a = "PM"
          if (hr < 12) {
            a = "AM"
          }
          if (hr == 0) {
            hr = 12
          }
          if (hr > 12) {
            hr = hr - 12
          }

          hourly.push({ hr, hora: a, icon: responseFiveDaysWeather.list[index].weather[0].icon, temp })

        }
        setHourlyForescat(hourly)
        const uniqueF: number[] = [];
        const icon: string[] = []


        const filteredDays = responseFiveDaysWeather.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt).getDate();

          if (uniqueF.length < 5) {

            if (!uniqueF.includes(forecastDate) && !icon.includes(forecast.weather[0].icon)) {
              icon.push(forecast.weather[0].icon)
              uniqueF.push(forecastDate);

              return true;
            }
          }
          return false;
        });



        setFiveDaysWeather(filteredDays)
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
      const {lon, lat } = data[0];

      // Llama a getDetailsWeather usando await
      await getDetailsWeather({  lon, lat });
    } catch (error) {
      console.log('Falló la solicitud de coordenadas');
    }
  }

   async function getUserCoordinate() {
    navigator.geolocation.getCurrentPosition(position => {
      const { longitude, latitude } = position.coords
      getDetailsWeather({lon : longitude.toString(), lat: latitude.toString()})
    })
  }


  return { getCityCoordinates, getUserCoordinate, weatherCity, fiveDaysWeather, airPollution, hourlyForescat }
}

