import '../css/RegistrationForm.css'

// function RadioButtons(props) {
//   const { label, name, options, ...rest } = props
//   return (
//     <div>
//       <label>{label}</label>
//       <Field name={name}>
//         {formik => {
//           const { field } = formik
//           return options.map(option => {
//             return (
//               <div key={option.key}>
//                 <input
//                   type="radio"
//                   id={option.value}
//                   {...field}
//                   {...rest}
//                   value={option.value}
//                   checked={field.value === option.value}
//                 />
//                 <label htmlFor={option.value}>{option.key}</label>
//               </div>
//             )
//           })
//         }}
//       </Field>
//       <ErrorMessage name={name} />
//     </div>
//   )
// }

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