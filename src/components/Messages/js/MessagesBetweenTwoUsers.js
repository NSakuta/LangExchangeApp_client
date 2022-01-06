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
import { getCurrentUserIdFromLocalStorage } from '../../../store/authReducer/authReducer';
import Loader from '../../Loader/Loader';

const MessagesBetweenTwoUsers = () => {

    const users = useSelector(userSelector);
    const dispatch = useDispatch();
    const messages = useSelector(messagesSelector);
    const navigate = useNavigate();
    const currentUserId = getCurrentUserIdFromLocalStorage();

    const { id } = useParams(); 
    const user = findUserById(users, id)


    useEffect(() => {
            dispatch(getAllUsersAction())
    }, [dispatch])

    ////load data from database every 5s

    useEffect(() => {
        let isMounted = true;
        const intervalId = setInterval(() => { 
            dispatch(getAllMessagesAction())
        }, 5000)
        return () => {
            clearInterval(intervalId); 
            isMounted = false;
        }
    })

    const { form } = useForm({
        defaultValues: { text: ''},
        onSubmit: (values, { reset }) => {
            const newValue = {...values, sentBy: currentUserId, recipient: id}
            dispatch(addNewMessageAction(newValue));
            reset();
        }
    })  

    return (
        <div className="container-messages">

                <div className="container-messages-left">
                    <div id="box-top-msgs">
                        {messages.length === 0 ? 
                            <Loader></Loader> 
                            : 
                            <Chat messages={messages} currentUserId={currentUserId} id={id}></Chat>
                        }
                    </div>
                    
                    <div id="box-bottom-input">
                        <form id="box-bottom-form" ref={form}>
                            <div id="box-bottom-message">
                                <textarea id="textarea-msg" 
                                        name="text" 
                                        placeholder="Write your message">            
                                </textarea>
                                <br/>
                            </div>
                            <button id="btn-send" type="submit">Send</button>
                        </form>  
                    </div>
                </div>

                <div className="container-messages-right">
                    {users.length !== 0 && 
                        <div id="box-right">
                            <div id="box-right-top">
                                <div id="box-right-img" 
                                    style={{ "background": `url(${user.img}) no-repeat center`, "backgroundSize": "cover" }}>       
                                </div>
                            </div>
                            <div id="box-right-bottom">
                                <div id="box-right-bottom-info">
                                    <h4 id="text-user-name">{user.firstName} {user.lastName}</h4>
                                    <p className="text-user" id="text-user-about">{user.about}</p><br/>
                                    <p className="text-user" id="text-user-learn">Learn: {user.practiceLanguage}</p>
                                    <p className="text-user" id="text-user-native">Native: {user.nativeLanguage}</p>
                                </div>
                                <div id="box-right-bottom-btn">
                                    <button className="right-bottom-btn" 
                                            id="btn-view-profile" 
                                            onClick={() => navigate(`/users/${user._id}`)}>view profile
                                    </button>                          
                                </div>
                            </div>
                        </div>
                    }
                </div>
        </div>
    )
}

export default MessagesBetweenTwoUsers;



