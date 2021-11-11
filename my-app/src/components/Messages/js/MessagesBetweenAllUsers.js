import '../css/MessagesBetweenAllUsers.css'
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { messagesSelector } from "../../../store/messageReducer/messagesReducer";
import { getAllMessagesAction } from '../../../store/messageReducer/messagesReducer';
import { userSelector, currentUserSelector, setCurrentUserAction } from "../../../store/userReducer/userReducer";
import { getAllUsersAction } from "../../../store/userReducer/userReducer";
import Message from './Message';
import { AppContext } from '../../../App';
import { NavLink } from 'react-router-dom';



const MessagesPage = () => {

    const {findReceivedMessagesByUserId, findSentMessagesByUserId} = useContext(AppContext);
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

    let receivedMessages = findReceivedMessagesByUserId(currentUserId, messages);
    let sentMessages = findSentMessagesByUserId(currentUserId, messages);
    
    receivedMessages.push(...sentMessages)

    let messagesByUniqueUsers = receivedMessages.filter((el, index, array) => array.findIndex(item => (item.sentBy === el.sentBy)) === index);


    // console.log('currentUserId', currentUserId)
    // console.log('messages', messages)
    // console.log('received', receivedMessages)
    // console.log('newArray: ', messagesByUniqueUsers)
    // console.log('rec.mes. before ', receivedMessages)
    // console.log('sent.mes.', sentMessages)
    // console.log('rec.mes. after', receivedMessages)
    // const params = useParams();
    // console.log('params: ', params)


    return (
        <div>
            <div className="wrapper-allUsers">
                <div className="allUsers">
                    {messages.length === 0 ? <div></div> : users.length === 0 ? <div></div> : 
                    <div>
                        {messagesByUniqueUsers.map(el => {
                            return (
                                <NavLink key={el._id} to={`/${currentUserId}/me/messages/${el.sentBy}`}>
                                <Message key={el._id}
                                    message={el}
                                    users={users}
                                ></Message>
                                </NavLink>
                            )
                        })}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default MessagesPage;


//let newArray = [...new Set(messages.map(item => item.sentBy))];


