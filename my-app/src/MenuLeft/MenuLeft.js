import './css/MenuLeft.css';
import { NavLink } from 'react-router-dom';
import { getCurrentUserIdFromLocalStorage } from '../store/authReducer/authReducer';

const MenuLeft = () => {

    const currentUserId = getCurrentUserIdFromLocalStorage();

    return (
         <div id="menu-left">
            <ul className="nav-left">
                <NavLink to={`/user/${currentUserId}/me/profile`} className="no-decoration"><li className="nav-left-li">Profile</li></NavLink>
                <NavLink to={`/user/${currentUserId}/me/messages`} className="no-decoration"><li className="nav-left-li">Messages</li></NavLink>
                <NavLink to={`/user/${currentUserId}/me/favourites`} className="no-decoration"><li className="nav-left-li">Favourites</li></NavLink>
            </ul>
        </div>
    )
}
export default MenuLeft;