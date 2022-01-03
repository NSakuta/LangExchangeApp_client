import '../css/RegistrationForm.css'

function RadioButtons(props) {
  const { label, name, options, error, ...rest } = props
  return (
    <div className="two-columns">
      <div>
      {options.map(option => {
            return (        
                <label className="radio-btns text-gray" key={option.key} htmlFor={option.value}>
                <input className="radio "
                  type="radio"
                  id={option.value}
                  value={option.value}
                  name="gender"
                {...rest}/>
                {option.key}</label>      
            )
          })
        }
        </div>
        <div>
          {/* <label className="label">{label}</label> */}
        </div>
        {error && <p>{error}</p>}
    </div>
  )
}



export default RadioButtons