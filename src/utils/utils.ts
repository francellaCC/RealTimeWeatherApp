import { DayOfWeek, MountofYear } from "./diccionari";

export const formartTemperature = (temperature : number) : number =>{
  const kelvin = 273.15;

  return parseInt((temperature - kelvin).toString());
}



export const getDayOfWeek =()=>{
  const date =  new Date()
  return `${DayOfWeek[date.getDay()]}, ${date.getDate()} ${date.getFullYear()}`
}

export const getDate=(dt_txt: string)=>{
    const date =  new Date(dt_txt)
  return `${date.getDate()} ${MountofYear[date.getMonth()]}`
}

export const getDay=(dt_txt: string)=>{
  const date =  new Date(dt_txt)
return `${DayOfWeek[date.getDay()]}`
}