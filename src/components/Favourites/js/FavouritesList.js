import Favourite from "./Favourite";
import { NavLink } from "react-router-dom";
import { getCurrentUserIdFromLocalStorage } from "../../../store/authReducer/authReducer";
import { findUserById } from "../../../store/userReducer/userReducer";
import { useNavigate } from "react-router";

const FavouritesList = ({users}) => {

    
    const currentUserId = getCurrentUserIdFromLocalStorage();
    const currentUser = findUserById(users, currentUserId);
    const navigate = useNavigate();
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
            {currentUser.favourites.length === 0 ? 
                <div className="info-box">
                    <p>No favourites yet</p>
                    <button className="btn-find" onClick={() => navigate('/users')}>Find someone</button>
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
                        })
                    }
                </div>
            } 
        </div>
    )
}

export default FavouritesList;
