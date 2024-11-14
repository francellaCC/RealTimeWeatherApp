export type FormSearchWeather = {
  city: string
}

export type Weather = {
  name: string
  main: {
    temp: number
    temp_max: number
    temp_min: number
  }
  sys: {
    country: string,
  }
  weather: [{
    icon: ''
  }]
}

export type FiveDaysWeather ={
  dt_txt: string,
  main:{
    temp: number;
  }
}