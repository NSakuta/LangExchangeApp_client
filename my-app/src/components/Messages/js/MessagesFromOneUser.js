import MessagesFromAllUsers from './MessagesFromAllUsers';
import '../css/MessagesFromOneUser.css'
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { messagesSelector, receivedMessagesSelector } from '../../../store/messageReducer/messagesReducer';
import { AppContext } from '../../../App';
import { useContext } from 'react';
import { currentUserSelector } from '../../../store/userReducer/userReducer';
import Comments from './Comments';
import { useState } from 'react';

const MessagesFromOneUser = () => {

    const { findReceivedMessagesByUserId } = useContext(AppContext);
    const messages = useSelector(messagesSelector);
    const currentUser = useSelector(currentUserSelector);
    const { id } = useParams();

    const [showResults, setShowResults] = useState(false)

    const receivedMessages = findReceivedMessagesByUserId(currentUser, messages);

    const messagesSentbyUser = findMessagesSentByUser(id, receivedMessages);

    const params = useParams();
    console.log(params)
    



    return (
        <div className="wrapper-messages">
            <div className="col-6">

                {messagesSentbyUser.map(el => {
                    return (
                        <div className="box-message">
                            <NavLink key={el._id} to={`${id}/${el._id}`}>
                                <button key={el._id} onClick={(e) => 
                                // name = e.target.baseURI.split('/')
                                setShowResults(true)
                            }
                               ><h4>{el.title}</h4>
                                <p>{el.text}</p></button>
                            </NavLink>
                        </div>
                    )

                })}


            </div>
            <div className="col-6">
                {showResults ? <Comments></Comments> : <div></div>}
            </div>
        </div>
    )
}

export default MessagesFromOneUser;

const findMessagesSentByUser = (id, array) => {
    return array.filter(el => el.sentBy === id);
}

const setName = (e) => {
    const target = e;
    return target;
}