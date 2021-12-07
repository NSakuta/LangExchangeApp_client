import './css/MenuLeft.css';
import { NavLink } from 'react-router-dom';
import { getCurrentUserIdFromLocalStorage } from '../store/authReducer/authReducer';
import imgMessage from '../img-svg/envelope.svg';
import imgProfile from '../img-svg/user (2).svg';
import imgFavourites from '../img-svg/star.svg';

const MenuLeft = () => {

    const currentUserId = getCurrentUserIdFromLocalStorage();

    return (
         <div id="menu-left">
            <ul className="nav-left">
                <NavLink to={`/user/${currentUserId}/me/profile`} className="no-decoration"><li className="nav-left-li"><img id="svg-img" src={imgProfile} alt="img"></img>Profile</li></NavLink>
                <NavLink to={`/user/${currentUserId}/me/messages`} className="no-decoration"><li className="nav-left-li"><img id="svg-img" src={imgMessage} alt="img"></img>Messages</li></NavLink>
                <NavLink to={`/user/${currentUserId}/me/favourites`} className="no-decoration"><li className="nav-left-li"><img id="svg-img" src={imgFavourites} alt="img"></img>Favourites</li></NavLink>
            </ul>
        </div>
    )
}
export default MenuLeft;