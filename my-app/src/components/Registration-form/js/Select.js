import Error from "./Error"
import '../css/RegistrationForm.css'

function Select(props) {
  const { label, name, options, error, ...rest } = props

  return (
    <div>
     <div>
        <select className="width-100" id={name} name={name}  {...rest}>
            {options.map(option => {
                if(option.value === null) {
                    return (
                        <option value={option.value} disabled>
                        {option.key}
                        </option>
                    )
                } else {
                    return (
                        <option value={option.value} placeholder="options">
                        {option.key}
                        </option>
                    )
                }         
            })}
            </select>
        </div>
        <div className="lb-reg">
            <label htmlFor={name}>{label}</label>
        </div>
        {error && <Error text={error}></Error>}  
    </div>
  )
}

export default Select;