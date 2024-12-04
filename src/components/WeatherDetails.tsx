
const diccionary = [
  "humedity",
  "pressure",
  "visibility",
  "windSpeed",
  "feelsLike"
]
function WeatherDetails({label, valor, icon, text}: {label: string, valor: number, icon: number,  text:string}) {
  return (
    <div className="card_details">
      <div className="card_header">
        <p>{label}</p>
      </div>
      <div className="card_body">
        <img src={`${diccionary[icon]}.svg`}  alt="" />
        <p>{valor} <span>{text}</span></p>
      </div>
    </div>
  )
}

export default WeatherDetails