import { Route, Routes } from 'react-router-dom';
import UserProfile from '../../UserProfile/js/UserProfile';
import MenuLeft from './MenuLeft';
import MessagesBetweenTwoUsers from '../../Messages/js/MessagesBetweenTwoUsers'
import MessagesBetweenAllUsers from '../../Messages/js/MessagesBetweenAllUsers'
import Favourites from '../../Favourites/js/Favourites';
import '../css/MenuLeft.css'
import { userSelector } from '../../../store/userReducer/userReducer';
import { useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import UserHomePage from '../../UserHomePage/UserHomePage';

const MenuLeftRoutes = () => {

    const users = useSelector(userSelector)

    return (
        <div className="container-menubar-left">
            <MenuLeft></MenuLeft>
            {users.length === 0 && <Loader></Loader>}
            <Routes>
                <Route path="homepage" element={<UserHomePage></UserHomePage>}></Route>
                <Route path='profile' element={<UserProfile></UserProfile>}></Route>
                <Route path='messages/*' element={<MessagesBetweenAllUsers></MessagesBetweenAllUsers>}></Route>
                <Route path='messages/:id/*' element={<MessagesBetweenTwoUsers></MessagesBetweenTwoUsers>}></Route>
                <Route path='favourites' element={<Favourites/>}></Route>
            </Routes>
        </div>
    )
}
export default MenuLeftRoutes;