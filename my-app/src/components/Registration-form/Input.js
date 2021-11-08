import Error from "./Error";
import './RegistrationForm.css'


function Input(props) {
  const { name, label, error, type, className, ...rest } = props
  return (
    <div className={className}>
      <div>
        <input className="width-100" type={type} name={name} {...rest} />
      </div>
      <div className="lb-reg">
        <label htmlFor={name}> {label}</label>
      </div>
      {error && <Error text={error}></Error>}
    </div>
  )
}
export default Input