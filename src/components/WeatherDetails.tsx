
function WeatherDetails({label, valor, icon}: {label: string, valor: number, icon: string}) {
  return (
    <div className="card_details">
      <div className="card_header">
        <p>{label}</p>
      </div>
      <div className="card_body">
        <span></span>
        <p>{valor} <span>{icon}</span></p>
      </div>
    </div>
  )
}

export default WeatherDetails