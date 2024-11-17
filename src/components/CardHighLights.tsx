import { AirPullution } from "../hook/useWeather"
import AirPollutionDetails from "./AirPollutionDetails"

type CardHighLightsProps = {
  airPollution: AirPullution | undefined
}

const defaultComponents = {
  co: 0,
  nh3: 0,
  no: 0,
  no2: 0,
  o3: 0,
  pm10: 0,
  pm2_5: 0,
  so2: 0
};

function CardHighLights({ airPollution }: CardHighLightsProps) {

  const componentsObject = airPollution?.list[0].components;

  console.log(componentsObject)

  console.log()
  return (
    <div className="weather-right">
      <h2 >Destacados de hoy</h2>
      <div className="highLight">
        <div className="card">
          <div className="card-head">
            <p>Índice de calidad del aire</p>
            <p>Calidad</p>
          </div>

          <div className="air-index">
            <i className="fas fa-wind"></i>
            {

              <AirPollutionDetails components={componentsObject}/>
        
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardHighLights