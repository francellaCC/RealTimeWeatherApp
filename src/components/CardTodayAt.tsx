import { formartTemperature } from "../utils/utils";

type CardTodayAtProps = {
  hourlyForescat: {
    hr: number;
    hora: string;
    icon: string;
    temp: number;
  }
}

function CardTodayAt({ hourlyForescat }: CardTodayAtProps) {
  return (

    <div className='card_hourlyForescat'>
      <p className='card_hourlyForescat_element_hour'>{hourlyForescat.hr ? hourlyForescat.hr : "3"} <span>{hourlyForescat.hora ? hourlyForescat.hora : "AM"}</span></p>
      <img src={`https://openweathermap.org/img/wn/${hourlyForescat.icon}.png`} alt="" />
      <p className='card_hourlyForescat_element_temp'>{hourlyForescat.temp ? formartTemperature(hourlyForescat.temp) : "0"} &deg;C</p>
    </div>

  )
}

export default CardTodayAt