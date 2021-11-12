import { currentUserSelector, setCurrentUserAction } from "../../store/userReducer/userReducer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Users = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentUserAction())
    }, [dispatch])

    const currentUser = useSelector(currentUserSelector);
    

   

    return (
        <div>
        </div>
    )
}

export default Users;