import { Route, Routes } from 'react-router-dom';
import UserProfile from '../components/UserProfile/UserProfile';
import MenuLeft from './MenuLeft';
import MessagesBetweenTwoUsers from '../components/Messages/js/MessagesBetweenTwoUsers'
import MessagesBetweenAllUsers from '../components/Messages/js/MessagesBetweenAllUsers'

const MenuLeftRoutes = () => {
    return (
        <div>
            <MenuLeft></MenuLeft>
            <Routes>
                <Route path='profile' element={<UserProfile></UserProfile>}></Route>
                <Route path='messages/*' element={<MessagesBetweenAllUsers></MessagesBetweenAllUsers>}></Route>
                <Route path='messages/:id/*' element={<MessagesBetweenTwoUsers></MessagesBetweenTwoUsers>}></Route>
            </Routes>
        </div>
    )
}
export default MenuLeftRoutes;