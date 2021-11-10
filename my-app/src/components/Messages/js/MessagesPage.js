import '../css/MessagesPage.css'
import MessagesFromAllUsers from './MessagesFromAllUsers';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { messagesSelector } from "../../../store/messageReducer/messagesReducer";
import {getAllMessagesAction} from '../../../store/messageReducer/messagesReducer';
import { userSelector, currentUserSelector, setCurrentUserAction } from "../../../store/userReducer/userReducer";
import { getAllUsersAction } from "../../../store/userReducer/userReducer";

const MessagesPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMessagesAction())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    useEffect(() => {
        dispatch(setCurrentUserAction())
    }, [dispatch]) 
    

    const messages = useSelector(messagesSelector);
    const currentUserId = useSelector(currentUserSelector);
    const users = useSelector(userSelector);

    const receivedMessages = findReceivedMessagesByUserId(currentUserId, messages)

    const messagesByUniqueUsers = receivedMessages.filter((el,index,array)=>array.findIndex(item=>(item.sentBy === el.sentBy))===index);


    //let newArray = [...new Set(messages.map(item => item.sentBy))];

    
    console.log('currentUserId', currentUserId)
    console.log('messages', messages)
    console.log('received', receivedMessages)
    console.log('newArray: ', messagesByUniqueUsers)


    return (
        <div>
            <div className="wrapper-profile">
                <div className="col-3">
                    {messages.length === 0 ? <div></div> : users.length === 0 ? <div></div> : <MessagesFromAllUsers messagesByUniqueUsers={messagesByUniqueUsers} users={users}></MessagesFromAllUsers>}
                    
                </div>
                <div className="col-3"></div>
            <div className="col-4"></div>
        </div>
        </div>
    )
}

export default MessagesPage;


const findReceivedMessagesByUserId = (id, array) => {
    let receivedMessages = [];

    if(id !== null) {
        receivedMessages = array.filter(el => el.recipient === id);
    }
    return receivedMessages;
}