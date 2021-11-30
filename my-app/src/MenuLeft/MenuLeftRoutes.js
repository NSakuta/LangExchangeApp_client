import { Route, Routes } from 'react-router-dom';
import UserProfile from '../components/UserProfile/js/UserProfile';
import MenuLeft from './MenuLeft';
import MessagesBetweenTwoUsers from '../components/Messages/js/MessagesBetweenTwoUsers'
import MessagesBetweenAllUsers from '../components/Messages/js/MessagesBetweenAllUsers'
import Favourites from '../components/Favourites/js/Favourites';
import './css/MenuLeft.css'
import bg from '../img-svg/copy_of_web_program_service_banner_template_14.png'

const MenuLeftRoutes = () => {
    return (
        <div>
            <MenuLeft></MenuLeft>
            {/* <div id="text-welcome">
                <img id="img-welcome" src={bg} alt="bg"></img>
                <p>Welcome to your home page...</p>
            </div> */}
            <Routes>
                <Route path='profile' element={<UserProfile></UserProfile>}></Route>
                <Route path='messages/*' element={<MessagesBetweenAllUsers></MessagesBetweenAllUsers>}></Route>
                <Route path='messages/:id/*' element={<MessagesBetweenTwoUsers></MessagesBetweenTwoUsers>}></Route>
                <Route path='favourites' element={<Favourites/>}></Route>
            </Routes>
        </div>
    )
}
export default MenuLeftRoutes;