import {NavLink} from 'react-router-dom';
import './Header.css'

export default function Header() {
    return (
        <div className="wrapper">
            <div className="header">
                <a>
                    <svg className="logo"></svg>
                </a>
                <ul>
                    <li><NavLink className="nav-menu" to='/:id/profile'>Me</NavLink></li>
                    <li><NavLink className="nav-menu" to='/users'>Find tandem</NavLink></li>
                    <li><NavLink className="nav-menu" to='/blog'>Blog</NavLink></li>
                </ul>
                <div className="text-end"><NavLink className="nav-menu" to='/login'>Login</NavLink></div>
            </div>
        </div>
    )
}

