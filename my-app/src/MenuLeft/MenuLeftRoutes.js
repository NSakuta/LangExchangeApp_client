import { Route, Routes } from 'react-router-dom';
import UserProfile from '../components/UserProfile/js/UserProfile';
import MenuLeft from './MenuLeft';
import MessagesBetweenTwoUsers from '../components/Messages/js/MessagesBetweenTwoUsers'
import MessagesBetweenAllUsers from '../components/Messages/js/MessagesBetweenAllUsers'
import Favourites from '../components/Favourites/js/Favourites';
import './css/MenuLeft.css'

const MenuLeftRoutes = () => {
    return (
        <div>
            <MenuLeft></MenuLeft>
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