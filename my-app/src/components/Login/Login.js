import './Login.css'

const Login = () => {


    return (
        <div className="box-login">
            <form>
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
                    <h5 className="styled-h5">Sign up now</h5>
                </div>
            </form>
        </div>
    )
}

export default Login;