import { NavLink } from 'react-router-dom';
import './UserProfile.css'

const Profile = () => {
    return (
        <div>
            <div id="menu-left">
                <ul className="nav-left">
                    <li className="nav-left-li">Profile</li>
                    <NavLink to="/:id/me/messages"><li className="nav-left-li">Messages</li></NavLink>
                    <li className="nav-left-li">Favourites</li>
                </ul>
            </div>
            <div className="wrapper-profile">
                <div className="col-12"></div>
            </div>
        </div>
    )
}

export default Profile;