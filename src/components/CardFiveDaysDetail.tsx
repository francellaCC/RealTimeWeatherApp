
import { FiveDaysWeather } from '../index.ts/type'
import { formartTemperature, getDate, getDay } from '../utils/utils'


type CardFiveDaysDetailProps = {
  fiveDaysWeather: FiveDaysWeather[]
}
export default function CardFiveDaysDetail({ fiveDaysWeather }: CardFiveDaysDetailProps) {


  return (
    <div className='cardFivedays'>
      <h2>Pronóstico de 5 días</h2>

      {
        fiveDaysWeather.map(item => (
          <div key={item.dt_txt} className='cardFivedays_element'>
            <p>{item.main.temp ? formartTemperature(item.main.temp) : "0"}&deg;C</p>
            <p>{item.dt_txt ? getDate(item.dt_txt) : '----'}</p>
            <p>{item.dt_txt ? getDay(item.dt_txt) : '----'}</p>
          </div>
        ))
      }

    </div>
  )
}
