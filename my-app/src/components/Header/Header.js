import { NavLink } from 'react-router-dom';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, logoutAction } from '../../store/appreducer/appReducer';
import { getCurrentUserIdFromLocalStorage } from '../../store/authReducer/authReducer';

export default function Header() {

    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const currentUserId = getCurrentUserIdFromLocalStorage();

    console.log('auth: ', auth)

    return (
        <div className="wrapper">
            <div className="header">
                <a>
                    <svg height="22" width="22">
                        <circle cx="10" cy="10" r="10" stroke="white" stroke-width="1" fill="white" />
                    </svg>
                </a>
                {auth ? 
                    <>
                        <ul className="nav-top">
                            <li><NavLink className="nav-top-li" to={`/user/${currentUserId}/me`}>Me</NavLink></li>
                            <li><NavLink className="nav-top-li" to='/users'>Find tandem</NavLink></li>
                            <li><NavLink className="nav-top-li" to='/blog'>Blog</NavLink></li>
                        </ul>
                        <div className="text-end">
                            <NavLink className="nav-top-li" to='/' onClick={() => dispatch(logoutAction())}>Logout</NavLink>
                        </div></> 
                        : 
                        <>
                        <ul className="nav-top">
                            <li><NavLink className="nav-top-li" to='/users'>Find tandem</NavLink></li>
                            <li><NavLink className="nav-top-li" to='/blog'>Blog</NavLink></li>
                        </ul>
                        <div className="text-end">
                            <NavLink className="nav-top-li" to='/auth/login'>Login</NavLink>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

