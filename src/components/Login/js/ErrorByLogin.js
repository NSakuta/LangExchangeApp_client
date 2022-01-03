import '../css/ErrorByLogin.css'

const ErrorByLogin = ({text}) => {
    return (
        <div id="box-error-login">
            <p id="text-error-login">{text}</p>
        </div>
    );
};

export default ErrorByLogin;