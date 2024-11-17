
type AirPollutionProps = {
  components: {
    co: number;
    nh3: number;
    no: number;
    no2: number;
    o3: number;
    pm10: number;
    pm2_5: number;
    so2: number;
} | undefined
}
function AirPollutionDetails({components}: AirPollutionProps) {


  return (
    <>
      <div>
        <p>PM2.5</p>
        <h2>{components?.pm2_5 ? components.pm2_5 : 0}</h2>
      </div>
      <div>
        <p>PM10</p>
        <h2>{components?.pm10 ? components.pm10 : 0}</h2>
      </div>
      <div>
        <p>SO2</p>
        <h2>{components?.so2 ? components.so2 : 0}</h2>
      </div>
      <div>
        <p>CO</p>
        <h2>{components?.co ? components.co : 0}</h2>
      </div>
      <div>
        <p>NO</p>
        <h2>{components?.no ? components.no : 0}</h2>
      </div>
      <div>
        <p>NO2</p>
        <h2>{components?.no2 ? components.no2 : 0}</h2>
      </div>
      <div>
        <p>NH3</p>
        <h2>{components?.nh3 ? components.nh3 : 0}</h2>
      </div>
      <div>
        <p>O3</p>
        <h2>{components?.o3 ? components.o3 : 0}</h2>
      </div>
    </>
  )
}

export default AirPollutionDetails