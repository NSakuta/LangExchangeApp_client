import '../css/MessagesBetweenTwoUsers.css'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { messagesSelector, getAllMessagesAction } from '../../../store/messageReducer/messagesReducer';
import { useEffect } from 'react';
import { currentUserSelector, setCurrentUserAction } from '../../../store/userReducer/userReducer';

const MessagesFromOneUser = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentUserAction())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllMessagesAction())
    }, [dispatch])

    const messages = useSelector(messagesSelector);
    const currentUserId = useSelector(currentUserSelector);
    const { id } = useParams(); 

    let allMessagedByTwoUsers = messages.filter(
        el => (el.sentBy === id && el.recipient === currentUserId)
            || (el.sentBy === currentUserId && el.recipient === id)
    );
          
    console.log('filteredNumbers:', allMessagedByTwoUsers);
    console.log('messages: ', messages)
    console.log('sentBy: ', id)
    console.log('currentUser: ', currentUserId)

    return (
        <div className="wrapper-msg">
                <div className="wrapper-msg-left">
                    {allMessagedByTwoUsers.map(el => {
                        return (
                            <div className="box-message">
                                <p>{el.text}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="wrapper-msg-right">
                    
                </div>
        </div>
    )
}

export default MessagesFromOneUser;



