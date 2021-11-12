import '../css/MessagesBetweenTwoUsers.css'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { messagesSelector} from '../../../store/messageReducer/messagesReducer';
import { useEffect } from 'react';
import { currentUserSelector, setCurrentUserAction } from '../../../store/userReducer/userReducer';
import { getAllUsersAction } from '../../../store/userReducer/userReducer';
import { useForm } from 'react-cool-form';
import { addNewMessageAction } from '../../../store/messageReducer/messagesReducer';

const MessagesFromOneUser = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrentUserAction())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    const messages = useSelector(messagesSelector);
    const currentUserId = useSelector(currentUserSelector);
    const { id } = useParams(); 

    let allMessagedByTwoUsers = messages.filter(
        el => (el.sentBy === id && el.recipient === currentUserId)
            || (el.sentBy === currentUserId && el.recipient === id)
    );

    const { form } = useForm({
        defaultValues: { text: ''},
        onSubmit: (values, { reset }) => {
            const newValue = {...values, sentBy: currentUserId, recipient: id}
            console.log('onSubmit: ', newValue);
            dispatch(addNewMessageAction(newValue));
            reset();
        }
    })  
          
    // console.log('messages: ', messages)
    // console.log('allMessagedByTwoUsers:', allMessagedByTwoUsers);

    // console.log('sentBy: ', id)
    // console.log('currentUser: ', currentUserId)

    return (
        <div className="wrapper-msg">
                <div className="wrapper-msg-left">
                    <div id="box-top-msgs">
                    {allMessagedByTwoUsers.map(el => {
                        if(el.sentBy === currentUserId) {
                            return (
                                    <div className="right">{el.text}
                                        <p id="sign">me</p>
                                    </div>
                                )
                        } else {
                            return (
                                    <div className="left">
                                        {el.text}
                                    </div>
                            )
                        }
                    })}
                </div>
                <div id="box-bottom-input">
                <form ref={form}>
                <p>Write your message</p>
                <textarea id="inp-msg" name="text"></textarea>
                <button type="submit">Send</button>
                </form>
                    
                </div>
                </div>
                <div className="wrapper-msg-right">
                    
                </div>
        </div>
    )
}

export default MessagesFromOneUser;



