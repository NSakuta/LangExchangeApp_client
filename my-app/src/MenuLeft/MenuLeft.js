import './css/MenuLeft.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../store/userReducer/userReducer';


const MenuLeft = () => {

    const currentUserId = useSelector(currentUserSelector);

    return (
         <div id="menu-left">
            <ul className="nav-left">
                <NavLink to={`/${currentUserId}/me/profile`}><li className="nav-left-li">Profile</li></NavLink>
                <NavLink to={`/${currentUserId}/me/messages`}><li className="nav-left-li">Messages</li></NavLink>
                <NavLink to="/:id/me/favourites"><li className="nav-left-li">Favourites</li></NavLink>
            </ul>
        </div>
    )
}
export default MenuLeft;