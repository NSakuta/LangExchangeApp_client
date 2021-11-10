import { Route, Routes } from 'react-router-dom';
import UserProfile from '../components/UserProfile/UserProfile';
import MenuLeft from './MenuLeft';
import MessagesFromOneUser from '../components/Messages/js/MessagesFromOneUser'
import MessagesFromAllUsers from '../components/Messages/js/MessagesFromAllUsers'
import MessagesMain from '../components/Messages/js/MessagesMain';

const MenuLeftRoutes = () => {
    return (
        <div>
            <MenuLeft></MenuLeft>
            <Routes>
                <Route path='profile' element={<UserProfile></UserProfile>}></Route>
                <Route path='messages/*' element={<MessagesFromAllUsers></MessagesFromAllUsers>}></Route>
                <Route path='messages/:id/*' element={<MessagesFromOneUser></MessagesFromOneUser>}></Route>
            </Routes>
        </div>
    )
}
export default MenuLeftRoutes;