import { useEffect } from 'react';
import '../css/Message.css';
import { NavLink, useParams } from 'react-router-dom';


const Message = ({message, users}) => {

    const {id} = useParams();
    const {sentBy, recipient, title, text} = message;
    //const allUsers = users;

    const findUserById = (array, id) => {
        return array.find(el => el._id === id)
    }

    const sentByUser = findUserById(users, sentBy);
    
    //setTimeout(()=> {console.log('sent by user: ', sentByUser)}, 2000);

    //console.log('sent by user: ', sentByUser.firstName)

    return (
        <div className="box-message">
            <NavLink key={sentByUser._id} to={`/${id}/me/messages/${sentByUser._id}`}>
                <h4>{sentByUser.firstName}</h4>
                <p>{text}</p>
            </NavLink>
        </div>
    )
}
export default Message;