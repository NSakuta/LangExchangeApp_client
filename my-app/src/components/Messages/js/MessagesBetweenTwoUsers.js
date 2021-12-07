import '../css/MessagesBetweenTwoUsers.css'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userSelector } from '../../../store/userReducer/userReducer';
import { getAllUsersAction } from '../../../store/userReducer/userReducer';
import { useForm } from 'react-cool-form';
import { addNewMessageAction } from '../../../store/messageReducer/messagesReducer';
import { findUserById } from '../../../store/userReducer/userReducer';
import { useNavigate } from 'react-router';
import Chat from './Chat';
import { getAllMessagesAction } from '../../../store/messageReducer/messagesReducer';
import { messagesSelector } from '../../../store/messageReducer/messagesReducer';
const BASE_URL_IMAGE = 'http://localhost:8080/images/';

const MessagesBetweenTwoUsers = () => {

    const users = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(getAllUsersAction())
    }, [dispatch])

    const messages = useSelector(messagesSelector);

    useEffect(() => {
        let isMounted = true
        const intervalId = setInterval(() => { 
            dispatch(getAllMessagesAction())
        }, 5000)
        
        return () => {
            clearInterval(intervalId); 
            isMounted = false // the component is no longer mounted
        }
     
    })


    const navigate = useNavigate();
    const currentUserId = JSON.parse(localStorage.getItem('USER_ID'));
    const { id } = useParams(); 
    const user = findUserById(users, id)


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

    console.log('MessagesBetweenTwoUsers: ', messages)

    return (
        <div className="wrapper-msg">
                <div className="wrapper-msg-left">
                    <div id="box-top-msgs">
                        {messages.length !== 0 && <Chat messages={messages} currentUserId={currentUserId} id={id}></Chat>}
                    </div>
                    <div id="box-bottom-input">
                        <form id="box-bottom-form" ref={form}>
                            <div id="box-bottom-message">
                                <textarea id="textarea-msg" name="text" placeholder="Write your message"></textarea>
                                <br/>
                            </div>
                            <button id="btn-send" type="submit">Send</button>
                        </form>
                        
                    </div>
                </div>
                {users.length !== 0 && <div className="wrapper-msg-right">
                <div id="box-right">
                    <div id="box-right-top">
                    <div id="box-right-img" style={{ "background": `url(${BASE_URL_IMAGE + user.img}) no-repeat center`, "backgroundSize": "cover" }}></div>
                    </div>
                    <div id="box-right-bottom">
                        <div id="box-right-bottom-info">
                            <h4 id="text-user-name">{user.firstName} {user.lastName}</h4>
                            <p className="text-user" id="text-user-about">Some user´s information</p><br />
                            <p className="text-user" id="text-user-learn">Learn: {user.practiceLanguage}</p>
                            <p className="text-user" id="text-user-native">Native: {user.nativeLanguage}</p>
                        </div>
                        <div id="box-right-bottom-btn">
                            <button className="right-bottom-btn" id="btn-view-profile" onClick={() => navigate(`/users/${user._id}`)}>view profile</button>                          
                        </div>
                    </div>
                </div>
                </div> }
        </div>
    )
}

export default MessagesBetweenTwoUsers;



