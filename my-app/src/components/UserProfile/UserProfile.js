import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { currentUserSelector } from '../../store/userReducer/userReducer';
import './UserProfile.css'

const Profile = () => {
    const id = useSelector(currentUserSelector);
    return (
        <div>
            <div id="menu-left">
                <ul className="nav-left">
                    <li className="nav-left-li">Profile</li>
                    <li className="nav-left-li"><NavLink to={`/${id}/me/messages`}>Messages</NavLink></li>
                    <li className="nav-left-li">Favourites</li>
                </ul>
            </div>
        </div>
    )
}

export default Profile;