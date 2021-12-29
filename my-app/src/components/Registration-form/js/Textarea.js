import '../css/RegistrationForm.css'

function Textarea(props) {
  const { label, id, error, className, ...rest } = props
  return (
    <div className={className}>
        <div>
            <textarea className="width-100 reg-textarea" id={id} {...rest} />
        </div>
        <div className="lb-reg"><label htmlFor={id}>{label}</label></div>
        {error && <p>{error}</p>}
      {/* <ErrorMessage name={name} /> */}
    </div>
  )
}
export default Textarea;

