import { NavLink } from 'react-router-dom';
import './Login.css'
import { loginAction } from '../../store/userReducer/userReducer';
import { set, useForm } from 'react-cool-form';
import { useDispatch } from 'react-redux';

const Login = () => {

    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: ''
    }

    const {form} = useForm({
        defaultValues: initialValues,
        onSubmit: (values, {reset}) =>{
            console.log("onSubmit: ", values)
            //dispatch(loginAction(values));
            reset()
        }
      });

    return (
        <div className="box-login">
            <form rex={form} noValidate>
                <div className="box-header">
                    <h4 className="styled-h4">Login</h4>
                </div>
                <div className="box-body">
                    <div>
                        <input className="width-100 styled-inp" name="email" type="email" id="email" placeholder="e.g. example@test.com"></input>
                    </div>
                    <div>
                        <label className="lb-login text-gray" htmlFor="email">Your E-mail</label>
                    </div>
                    
                    <div>
                        <input className="width-100 styled-inp" name="password" type="password" placeholder="type your password"></input>
                    </div>
                    <div>
                        <label className="lb-login text-gray" htmlFor="password">Your password</label>
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
                    <NavLink to="/signup"><button className="btn-reg">Sign up now</button></NavLink>
                </div>
            </form>
        </div>
    )
}

export default Login;