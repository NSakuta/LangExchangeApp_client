import {NavLink} from 'react-router-dom';
import './Header.css'

export default function Header() {
    return (
        <div className="wrapper">
            <div className="header">
                <a>
                <svg height="22" width="22">
                    <circle cx="10" cy="10" r="10" stroke="white" stroke-width="1" fill="white" />
                </svg>
                </a>
                <ul className="nav-top">
                    <li><NavLink className="nav-top-li" to='/:id/me'>Me</NavLink></li>
                    <li><NavLink className="nav-top-li" to='/users'>Find tandem</NavLink></li>
                    <li><NavLink className="nav-top-li" to='/blog'>Blog</NavLink></li>
                </ul>
                <div className="text-end"><NavLink className="nav-top-li" to='/login'>Login</NavLink></div>
            </div>
        </div>
    )
}

