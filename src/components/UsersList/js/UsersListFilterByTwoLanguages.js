import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/userReducer/userReducer";
import { getAllUsersAction } from "../../../store/userReducer/userReducer";
import Search from "./Search";
import { getCurrentUserIdFromLocalStorage } from "../../../store/authReducer/authReducer";
import User from "./User";
import { NavLink } from "react-router-dom";
import { loaderSelector } from "../../../store/appreducer/appReducer";
import Loader from "../../Loader/Loader";


const UsersListAfterFilter = () => {

    const { native, practice } = useParams();
    const dispatch = useDispatch();
    const currentUserId = getCurrentUserIdFromLocalStorage();
    const isLoading = useSelector(loaderSelector)

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    const users = useSelector(userSelector)

    console.log('native', native)
    console.log('practice', practice)

    const usersAfterFilterByNative = users.filter(el => el.nativeLanguage === native)
    const usersAfterFilterByTwolanguages = usersAfterFilterByNative.filter(el => el.practiceLanguage === practice)

    console.log('usersAfterFilterByTwolanguages: ', usersAfterFilterByTwolanguages)

    return (
        <div>
            {isLoading ? <Loader></Loader> :
            <>
            <Search/>
            <div id="wrapper-users">
                {usersAfterFilterByTwolanguages.map(el => {
                    if(currentUserId !== el._id) {
                        return (
                            <NavLink className="inactive" id="box" key={el._id} to={`/users/${el._id}`}>
                                <User key={el._id}
                                    user={el}>                               
                                </User>
                            </NavLink>
                            )
                        }
                    })} 
            </div>
            </>
            }
            
        </div>
    )
}

export default UsersListAfterFilter;