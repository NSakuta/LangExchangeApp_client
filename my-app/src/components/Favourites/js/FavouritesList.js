import Favourite from "./Favourite";
import { NavLink } from "react-router-dom";
import { getCurrentUserIdFromLocalStorage } from "../../../store/authReducer/authReducer";
import { findUserById } from "../../../store/userReducer/userReducer";

const FavouritesList = ({users}) => {

    const currentUserId = getCurrentUserIdFromLocalStorage();
    const currentUser = findUserById(users, currentUserId);

    const favouritesIds = currentUser.favourites;

    console.log('currentUser: ', currentUser)

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
        <div id="wrapper-favourites">
                {favourites.map(el => {
                        return (
                            <NavLink id="box-fav" key={el._id} to={`/users/${el._id}`}>
                                <Favourite key={el._id}
                                    user={el}>
                                </Favourite>
                            </NavLink>
                        )      
                })}

            </div>
    )
}

export default FavouritesList;



