import '../css/Favourites.css'
import { getCurrentUserIdFromLocalStorage } from "../../../store/authReducer/authReducer";
import { findUserById, getAllUsersAction } from "../../../store/userReducer/userReducer";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/userReducer/userReducer";
import Favourite from "./Favourite";

const Favourites = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])


    const currentUserId = getCurrentUserIdFromLocalStorage();
    const users = useSelector(userSelector);
    const currentUser = findUserById(users, currentUserId);
    const favouritesIds = currentUser.favourites;
    
    function findUsersById() {
        let favourites = [];
        for(let i = 0; i < favouritesIds.length; i++) {
            let user = users.find(el => el._id === favouritesIds[i])       
            favourites.push(user);       
        }
        return favourites;
    }

    const favourites = findUsersById();

    return (
        <div>
            {favourites.length === 0 ? <div></div> : <div id="wrapper-favourites">
                {favourites.map(el => {
                        return (
                            <NavLink id="box-fav" key={el._id} to={`/users/${el._id}`}>
                                <Favourite key={el._id}
                                    user={el}>
                                </Favourite>
                            </NavLink>
                        )      
                })}

            </div>}
        </div>
    )
}

export default Favourites;