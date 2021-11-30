import { NavLink } from 'react-router-dom';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, logoutAction } from '../../store/appreducer/appReducer';
import { getCurrentUserIdFromLocalStorage } from '../../store/authReducer/authReducer';
import { userSelector } from '../../store/userReducer/userReducer';
import { useEffect } from 'react';
import { getAllUsersAction } from '../../store/userReducer/userReducer';
import { findUserById } from '../../store/userReducer/userReducer';
const BASE_URL_IMAGE = 'http://localhost:8080/images/'


export default function Header() {

    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    const currentUserId = getCurrentUserIdFromLocalStorage();

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    const users = useSelector(userSelector);
    const user = findUserById(users, currentUserId)

    console.log('auth: ', auth)

    return (
        <div id="wrapper-header">
            <div className="header">
                <NavLink to={`/`}>
                <div id="logo">
                    <div id="logo-circle-1">
                    </div>
                    <div id="logo-circle-2">
                    </div>
                </div>
                </NavLink>
                {users.length === 0 ? <div></div> : auth ? 
                    <>
                        <ul className="nav-top">
                                <NavLink className="nav-top-li" to={`/user/${currentUserId}/me`}>
                                    <div id="nav-top-me" style={{"background": `url(${BASE_URL_IMAGE + user.img}) no-repeat center`, "backgroundSize":"cover"}}></div>
                                </NavLink>
                            <li><NavLink className="nav-top-li" to='/users'>Find a partner</NavLink></li>
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

