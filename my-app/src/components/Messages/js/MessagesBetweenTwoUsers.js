import '../css/MessagesBetweenTwoUsers.css'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { messagesSelector} from '../../../store/messageReducer/messagesReducer';
import { useContext, useEffect } from 'react';
import { userSelector } from '../../../store/userReducer/userReducer';
import { currentUserSelector, setCurrentUserAction } from '../../../store/authReducer/authReducer'
import { getAllUsersAction } from '../../../store/userReducer/userReducer';
import { useForm } from 'react-cool-form';
import { addNewMessageAction } from '../../../store/messageReducer/messagesReducer';
import { AppContext } from '../../../App';

const MessagesFromOneUser = () => {

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(setCurrentUserAction())
    // }, [dispatch])

    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])

    const {findUserById} = useContext(AppContext);
    const messages = useSelector(messagesSelector);
    // const currentUserId = useSelector(currentUserSelector);

    const currentUserId = JSON.parse(localStorage.getItem('USER_ID'));
    
    const { id } = useParams(); 

    const users = useSelector(userSelector);

    const user = findUserById(users, id)
    console.log('user: ', user)

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
                <br/>
                <button type="submit">Send</button>
                </form>
                    
                </div>
                </div>
                <div className="wrapper-msg-right">
                    <div className="x-center">
                        <img id="box-avatar" src={user.img} alt="name"></img>
                        <h4>{user.firstName}, {user.lastName}</h4>
                        <p>{user.interests}</p>
                    </div>
                </div>
        </div>
    )
}

export default MessagesFromOneUser;



