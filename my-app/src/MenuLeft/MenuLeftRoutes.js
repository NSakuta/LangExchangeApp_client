import { Route, Routes } from 'react-router-dom';
import MessagesPage from '../components/Messages/js/MessagesPage';
import UserProfile from '../components/UserProfile/UserProfile';
import MenuLeft from './MenuLeft';

const MenuLeftRoutes = () => {
    return (
        <div>
            <MenuLeft></MenuLeft>
            <Routes>
                <Route path='profile' element={<UserProfile></UserProfile>}></Route>
                <Route path='messages' element={<MessagesPage></MessagesPage>}></Route>
            </Routes>
        </div>
    )
}
export default MenuLeftRoutes;