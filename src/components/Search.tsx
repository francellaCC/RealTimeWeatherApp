import { useForm } from "react-hook-form"
import { FormSearchWeather } from "../index.ts/type"

type SearchTypeProps = {
  getCityCoordinates: (formData: FormSearchWeather) => void
  getUserCoordinate: () => Promise<void>
}
export default function Search({ getCityCoordinates, getUserCoordinate }: SearchTypeProps) {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSearchWeather>()

  const formSearch = (formData: FormSearchWeather) => {
    getCityCoordinates(formData)
    reset()
  }

  const handleClick = () => {

    getUserCoordinate()
  }
  return (
    <>

      <form onSubmit={handleSubmit(formSearch)} className="form_weather">
        <div className="input_container">
          <input
            type="text"
            id="city"
            placeholder="Ciudad"
            {...register('city', { required: 'El nombre de la ciudad es obligatorio' })}
          />
          {errors.city && <p className="error_message">{errors.city.message}</p>}
        </div>
        <button className="button" type="submit">Buscar</button>
      </form>
      <button type="button" className="button button-location" onClick={handleClick}>Localidad</button>
    </>
  )
}
