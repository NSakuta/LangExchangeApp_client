import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { currentUserSelector } from '../../store/authReducer/authReducer';
import './UserProfile.css'
import { AppContext } from '../../App';
import { useContext } from 'react';

const Profile = () => {
    //const id = useSelector(currentUserSelector);
    const {getCurrentUserIdFromLocalStorage} = useContext(AppContext);
    const currentUserId = getCurrentUserIdFromLocalStorage();

    return (
        <div>
            <div id="menu-left">
                <ul className="nav-left">
                    <li className="nav-left-li">Profile</li>
                    <li className="nav-left-li"><NavLink to={`/${currentUserId}/me/messages`}>Messages</NavLink></li>
                    <li className="nav-left-li">Favourites</li>
                </ul>
            </div>
        </div>
    )
}

export default Profile;