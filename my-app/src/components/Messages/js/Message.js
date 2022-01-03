import '../css/Message.css';
import { useEffect } from 'react';
import { getAllMessagesAction } from '../../../store/messageReducer/messagesReducer';
import { useDispatch } from 'react-redux';

const Message = ({user, messages, currentUserId}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMessagesAction())
    }, [dispatch])

    let messagesBetweenTwoUsers = messages.filter(
        el => (el.sentBy === user._id && el.recipient === currentUserId)
            || (el.sentBy === currentUserId && el.recipient === user._id)
    );

    const lastMessage = messagesBetweenTwoUsers[messagesBetweenTwoUsers.length - 1];

    //console.log('messagesBetweenTwoUsers: ', lastMessage)
    // console.log('sentby', sentBy)
    // console.log('received by: ', receivedByUser)
    // console.log('sent by user: ', sentByUser)


    return (
        <div className="box-message">
            <div className="">
                <div className="avatar" style={{"background": `url(${user.img}) no-repeat center`, "backgroundSize":"cover"}}></div>
            </div>
            <h3 className="msg-sentBy">{user.firstName} {user.lastName}</h3> 
            {lastMessage ? <p id="msg-text">{lastMessage.text}</p> : <div></div>}
        </div>
    )
}

export default Message;

