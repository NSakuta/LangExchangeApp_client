import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { messagesSelector } from "../../../store/messageReducer/messagesReducer";
import {getAllMessagesAction} from '../../../store/messageReducer/messagesReducer';
import Message from "./Message";
import { userSelector, currentUserSelector, setCurrentUserAction } from "../../../store/userReducer/userReducer";
import { getAllUsersAction } from "../../../store/userReducer/userReducer";

const MessagesFromAllUsers = ({messagesByUniqueUsers, users}) => {

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllMessagesAction())
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(getAllUsersAction())
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(setCurrentUserAction())
    // }, [dispatch]) 
    

    // const messages = useSelector(messagesSelector);
    // const currentUserId = useSelector(currentUserSelector);
    // const users = useSelector(userSelector);

    // const receivedMessages = findReceivedMessagesByUserId(currentUserId, messages)

    // const newArray = receivedMessages.filter((el,index,array)=>array.findIndex(item=>(item.sentBy === el.sentBy))===index);

    // //let newArray = [...new Set(messages.map(item => item.sentBy))];

    
    // console.log('currentUserId', currentUserId)
    // console.log('messages', messages)
    // console.log('received', receivedMessages)
    // console.log('newArray: ', newArray)

    

    return (
        <div>
            {messagesByUniqueUsers.map(el => {
                return(
                <Message key={el._id}
                    message={el}
                    users={users}
                    ></Message>
                )
                
            })} 
        </div> 
    )
}

export default MessagesFromAllUsers;


