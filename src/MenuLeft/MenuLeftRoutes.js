import { Route, Routes } from 'react-router-dom';
import UserProfile from '../components/UserProfile/js/UserProfile';
import MenuLeft from './MenuLeft';
import MessagesBetweenTwoUsers from '../components/Messages/js/MessagesBetweenTwoUsers'
import MessagesBetweenAllUsers from '../components/Messages/js/MessagesBetweenAllUsers'
import Favourites from '../components/Favourites/js/Favourites';
import './css/MenuLeft.css'
import { userSelector } from '../store/userReducer/userReducer';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import { loaderSelector } from '../store/appreducer/appReducer';

const MenuLeftRoutes = () => {

    const users = useSelector(userSelector)
    const isLoading = useSelector(loaderSelector)

    return (
        <div>
            <MenuLeft></MenuLeft>
            {users.length === 0 && <Loader></Loader>}
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