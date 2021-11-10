import '../css/MessagesFromAllUsers.css'
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { messagesSelector } from "../../../store/messageReducer/messagesReducer";
import { getAllMessagesAction } from '../../../store/messageReducer/messagesReducer';
import { userSelector, currentUserSelector, setCurrentUserAction } from "../../../store/userReducer/userReducer";
import { getAllUsersAction } from "../../../store/userReducer/userReducer";
import Message from './Message';
import { AppContext } from '../../../App';

const MessagesPage = () => {
    


    const {findReceivedMessagesByUserId} = useContext(AppContext);
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

    const messagesByUniqueUsers = receivedMessages.filter((el, index, array) => array.findIndex(item => (item.sentBy === el.sentBy)) === index);


    //let newArray = [...new Set(messages.map(item => item.sentBy))];


    console.log('currentUserId', currentUserId)
    console.log('messages', messages)
    console.log('received', receivedMessages)
    console.log('newArray: ', messagesByUniqueUsers)


    return (
        <div>
            <div className="wrapper-profile">
                <div className="col-3">
                    {messages.length === 0 ? <div></div> : users.length === 0 ? <div></div> : 
                    <div>
                        {messagesByUniqueUsers.map(el => {
                            return (
                                <Message key={el._id}
                                    message={el}
                                    users={users}
                                ></Message>
                            )
                        })}
                    </div>}
                </div>
                <div className="col-3">                   
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    )
}

export default MessagesPage;


