import '../css/MessagesBetweenAllUsers.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { messagesSelector } from "../../../store/messageReducer/messagesReducer";
import { getAllMessagesAction } from '../../../store/messageReducer/messagesReducer';
import { userSelector } from "../../../store/userReducer/userReducer";
import { getAllUsersAction } from "../../../store/userReducer/userReducer";
import Message from './Message';
import { NavLink } from 'react-router-dom';
import { getCurrentUserIdFromLocalStorage } from '../../../store/authReducer/authReducer';
import { findUserById } from '../../../store/userReducer/userReducer';
import { findReceivedMessagesByUserId, findSentMessagesByUserId } from '../../../store/messageReducer/messagesReducer';
import { useNavigate } from 'react-router';
import Loader from '../../Loader/Loader';

const MessagesPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMessagesAction())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])


    const messages = useSelector(messagesSelector);
    const currentUserId = getCurrentUserIdFromLocalStorage();
    const users = useSelector(userSelector);
    const navigate = useNavigate();

    let receivedMessages = findReceivedMessagesByUserId(currentUserId, messages);
    let sentMessages = findSentMessagesByUserId(currentUserId, messages);


    const uniqueReceivedMessages = receivedMessages.filter(
        (el, index, array) => array.findIndex(
            item => (item.sentBy === el.sentBy)
        ) === index
    );

    let uniqueSentMessages = sentMessages.filter(
        (el, index, array) => 
                array.findIndex(item => (item.recipient === el.recipient)) === index);  
    
    uniqueReceivedMessages.push(...uniqueSentMessages);

   const usersId = uniqueReceivedMessages.map(el => { 
        if(el.sentBy === currentUserId) {
            return el.recipient
        } else {
            return el.sentBy
        }
    });

    const uniqueUsersId = usersId.filter((x, i, a) => a.indexOf(x) === i)
    const uniqueUsers = findUsersById(uniqueUsersId, users);

    return (
        <div>
            <div className="container-messages">
                <div className="allUsers-messages">
                    {messages.length === 0 ? <div></div> 
                    : users.length === 0 ? <div></div> 
                    : uniqueUsers.length === 0 ? 
                        <div className="info-box">
                            <p>No messages yet</p>
                            <button className="btn-find" onClick={() => navigate('/users')}>
                                Find someone
                            </button>
                        </div> 
                    : <div>
                        {uniqueUsers.map(el => {
                                return (
                                    <NavLink id="box-msg" key={el._id} to={`/user/${currentUserId}/me/messages/${el._id}`}>
                                        <Message key={el._id}
                                                    user={el}
                                                    users={users}
                                                    messages={messages}
                                                    currentUserId={currentUserId}>
                                        </Message>
                                    </NavLink>
                                    )
                                })
                            } 
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MessagesPage;


/////////Functions

function findUsersById(idsArray, array) {
    const newArray = [];
    for(let i = 0; i < idsArray.length; i++) {
        const uniqueUser = findUserById(array, idsArray[i])            
        newArray.push(uniqueUser)
    }
    return newArray;
}




