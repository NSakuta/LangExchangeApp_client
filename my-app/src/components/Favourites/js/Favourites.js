import '../css/Favourites.css'
import { getAllUsersAction } from "../../../store/userReducer/userReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/userReducer/userReducer";
import FavouritesList from './FavouritesList';

const Favourites = () => {

    const dispatch = useDispatch();
    const users = useSelector(userSelector);

    useEffect(() => {
        if(!users) {
            dispatch(getAllUsersAction())
        }
    }, [dispatch, users])

    return (
        <div>
            {users.length && <FavouritesList users={users}></FavouritesList>}
        </div>
    )
}

export default Favourites;