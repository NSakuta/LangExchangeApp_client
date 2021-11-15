import { NavLink } from 'react-router-dom';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, logout } from '../../store/appreducer/appReducer';

export default function Header() {

    const auth = useSelector(authSelector);
    const dispatch = useDispatch();

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
                            <li><NavLink className="nav-top-li" to='/:id/me'>Me</NavLink></li>
                            <li><NavLink className="nav-top-li" to='/users'>Find tandem</NavLink></li>
                            <li><NavLink className="nav-top-li" to='/blog'>Blog</NavLink></li>
                        </ul>
                        <div className="text-end">
                            <NavLink className="nav-top-li" to='/' onClick={() => dispatch(logout())}>Logout</NavLink>
                        </div></> 
                        : 
                        <>
                        <ul className="nav-top">
                            <li><NavLink className="nav-top-li" to='/users'>Find tandem</NavLink></li>
                            <li><NavLink className="nav-top-li" to='/blog'>Blog</NavLink></li>
                        </ul>
                        <div className="text-end">
                            <NavLink className="nav-top-li" to='/login'>Login</NavLink>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

