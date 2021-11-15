import './css/MenuLeft.css';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../App';
import { useContext } from 'react';

const MenuLeft = () => {

    const {getCurrentUserIdFromLocalStorage} = useContext(AppContext);
    const currentUserId = getCurrentUserIdFromLocalStorage();

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