import { AirPullution } from "../hook/useWeather"
import { aqiList } from "../utils/diccionari";
import AirPollutionDetails from "./AirPollutionDetails"

type CardHighLightsProps = {
  airPollution: AirPullution | undefined
}

function CardHighLights({ airPollution }: CardHighLightsProps) {

  const componentsObject = airPollution?.list[0].components;
  const quality = airPollution?.list[0].main.aqi


  console.log("airPollution", aqiList[quality ? quality - 1 : 1])
  return (
    <div className="weather-right">
      <h2 >Destacados de hoy</h2>
      <div className="highLight">
        <div className="card">
          <div className="card-head">
            <p>Índice de calidad del aire</p>
            <p className={` color_${quality} calidad` }>{aqiList[quality ? quality - 1 : 1]}</p>
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