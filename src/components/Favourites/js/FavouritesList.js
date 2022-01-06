import Favourite from "./Favourite";
import { NavLink } from "react-router-dom";
import { getCurrentUserIdFromLocalStorage } from "../../../store/authReducer/authReducer";
import { findUserById } from "../../../store/userReducer/userReducer";
import { useNavigate } from "react-router";

const FavouritesList = ({users}) => {

    
    const currentUserId = getCurrentUserIdFromLocalStorage();
    console.log('currentuserId: ', currentUserId)
    const currentUser = findUserById(users, currentUserId);
    const navigate = useNavigate();
    const favouritesIds = currentUser.favourites;

    console.log('favouritesid: ', favouritesIds)


    function findUsersById() {
        let favourites = [];
        for(let i = 0; i < favouritesIds.length; i++) {
            let user = users.find(el => el._id === favouritesIds[i])       
            favourites.push(user);       
        }
        return favourites;
    }
    
    const favourites = findUsersById();

    console.log('currentUser: ', currentUser)
    console.log('favourites: ', favourites)



    return (
        <div>
            {currentUser.favourites.length === 0 ? 
                <div className="info-box">
                        <p>No favourites yet</p>
                        <button id="btn-find" onClick={() => navigate('/users')}>Find someone</button>
                </div> 
                :
                <div id="wrapper-favourites"> 
                {favourites.map(el => {
                    return (
                        <NavLink className="inactive" id="box-fav" key={el._id} to={`/users/${el._id}`}>
                            <Favourite key={el._id}
                                user={el}>
                            </Favourite>
                        </NavLink>
                    )      
                })}
                </div>
                } 
                

            </div>
    )
}

export default FavouritesList;



const refreshPage = () => {
    window.location.reload(false)
}