import { NavLink } from 'react-router-dom';
import '../css/Login.css'
import { errorAuthSelector, getCurrentUserIdFromLocalStorage, loginAction, resetErrorAction } from '../../../store/authReducer/authReducer';
import { useForm } from 'react-cool-form';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, isAuthTrue } from '../../../store/appreducer/appReducer';
import { Navigate } from 'react-router-dom';
import Error from '../../Registration-form/js/Error';

const Login = () => {

    const dispatch = useDispatch();
    const auth = useSelector(authSelector);
    const currentUserId = getCurrentUserIdFromLocalStorage();
    const errByLogin = useSelector(errorAuthSelector);
    
    const initialValues = {
        email: '',
        password: ''
    }

    const {form} = useForm({
        defaultValues: initialValues,
        onSubmit: (values, {reset}) => {
            dispatch(loginAction(values));
            reset()
        }
    });

    console.log('auth: ', auth)

    return (
        <div>
                {errByLogin && <Error text={errByLogin}></Error>}
        <div className="box-login">
            {auth && <Navigate to={`/user/${currentUserId}/me`}></Navigate>}
            <form ref={form} noValidate>
                <div className="box-header">
                    <h4 className="styled-h4">Login</h4>
                </div>
                <div className="box-body">
                    <div>
                        <input className="width-100 styled-inp" name="email" type="email" id="email" placeholder="e.g. example@test.com"></input>
                    </div>
                    <div>
                        <label className="label text-gray" htmlFor="email">Your E-mail</label>
                    </div>
                    <div>
                        <input className="width-100 styled-inp" name="password" type="password" placeholder="type your password"></input>
                    </div>
                    <div>
                        <label className="label text-gray" htmlFor="password">Your password</label>
                    </div>
                    <h6 className="styled-h6">Forgot Username or password?</h6>
                </div>
                <div className="box-btns">
                    <input className="btn-login" type="submit" value="log in"></input>
                </div>
                <div className="box-footer">
                    <div>
                        <p className="styled-p">Don't have an account?</p>
                    </div>
                    <br/>
                    <NavLink to="/auth/signup"><button className="btn-reg">Sign up now</button></NavLink>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Login;