import { useForm } from "react-hook-form"
import { FormSearchWeather } from "../index.ts/type"

type SearchTypeProps = {
  getCityCoordinates: (formData: FormSearchWeather) => void
}
export default function Search({ getCityCoordinates }: SearchTypeProps) {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSearchWeather>()

  const formSearch = (formData: FormSearchWeather) => {
    console.log(formData)
    getCityCoordinates(formData)
    reset()
  }
  return (
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
      <button type="submit">Buscar</button>
    </form>
  )
}
