import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/userReducer/userReducer";
import { getAllUsersAction } from "../../../store/userReducer/userReducer";
import Search from "./Search";
import { getCurrentUserIdFromLocalStorage } from "../../../store/authReducer/authReducer";
import { NavLink } from "react-router-dom";
import User from "./User";
import Loader from "../../Loader/Loader";
import { loaderSelector } from "../../../store/appreducer/appReducer";

const UsersListAfterFilterByPracticeLang = () => {

    const { practice } = useParams();
    const dispatch = useDispatch();
    const currentUserId = getCurrentUserIdFromLocalStorage();
    const isLoading = useSelector(loaderSelector)

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    let users = useSelector(userSelector)

    let usersAfterFilter =  users.filter(el => el.practiceLanguage === practice);

    console.log('usersAfterFilter by Practice language: ', usersAfterFilter)

    return (
        <div>
            {isLoading ? <Loader></Loader> : 
            <>
                <Search/>
                <div id="wrapper-users">
                    {usersAfterFilter.map(el => {
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

export default UsersListAfterFilterByPracticeLang ;