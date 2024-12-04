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
            <p className={` color_${quality} calidad`}>{aqiList[quality ? quality - 1 : 1]}</p>
          </div>

          <div className="air-index">
            <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 -960 960 960" width="70px" fill="#e8eaed"><path d="M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z" /></svg>
            {

              <AirPollutionDetails components={componentsObject} />

            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardHighLights