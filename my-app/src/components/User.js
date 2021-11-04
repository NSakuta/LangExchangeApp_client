import { getAllUsersAction, userSelector } from "../store/userReducer/userReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function User() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    const users = useSelector(userSelector);



    console.log('users: ', users)
    return (
        <div>

        </div>
    )
}

