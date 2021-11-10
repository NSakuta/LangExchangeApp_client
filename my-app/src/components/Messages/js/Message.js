import { useEffect } from 'react';
import '../css/Message.css';


const Message = ({message, users}) => {

    const {id, sentBy, recipient, title, text} = message;
    //const allUsers = users;

    const findUserById = (array, id) => {
        return array.find(el => el._id === id)
    }

    const sentByUser = findUserById(users, sentBy);
    
    //setTimeout(()=> {console.log('sent by user: ', sentByUser)}, 2000);

    //console.log('sent by user: ', sentByUser.firstName)

    return (
        <div className="box-message">
            <h4>{sentByUser.firstName}</h4>
            <p>{text}</p>
        </div>
    )
}
export default Message;