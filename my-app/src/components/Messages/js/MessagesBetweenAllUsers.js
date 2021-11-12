import '../css/MessagesBetweenAllUsers.css'
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { messagesSelector } from "../../../store/messageReducer/messagesReducer";
import { getAllMessagesAction } from '../../../store/messageReducer/messagesReducer';
import { userSelector, currentUserSelector, setCurrentUserAction } from "../../../store/userReducer/userReducer";
import { getAllUsersAction } from "../../../store/userReducer/userReducer";
import Message from './Message';
import { AppContext } from '../../../App';
import { NavLink } from 'react-router-dom';



const MessagesPage = () => {

    const {findReceivedMessagesByUserId, findSentMessagesByUserId, findUserById} = useContext(AppContext);
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

    let receivedMessages = findReceivedMessagesByUserId(currentUserId, messages);
    let sentMessages = findSentMessagesByUserId(currentUserId, messages);


    const uniqueReceivedMessages = receivedMessages.filter(
        (el, index, array) => array.findIndex(
            item => (item.sentBy === el.sentBy)
        ) === index
    );

    let uniqueSentMessages = sentMessages.filter((el, index, array) => array.findIndex(item => (item.recipient === el.recipient)) === index);  
    
    uniqueReceivedMessages.push(...uniqueSentMessages);

   const usersId = uniqueReceivedMessages.map(el => { 
        if(el.sentBy === currentUserId) {
            return el.recipient
        } else {
            return el.sentBy
        }
    });


      const uniqueUsersId = usersId.filter((x, i, a) => a.indexOf(x) === i)

      function findUsersById() {
        const newArray = [];
        for(let i = 0; i < uniqueUsersId.length; i++) {
            const a = findUserById(users, uniqueUsersId[i])            
            newArray.push(a)
        }
        return newArray;
      }

      const uniqueUsers = findUsersById();

      

    // console.log('currentUserId', currentUserId)
    // console.log('messages', messages)
    //console.log('received', receivedMessages)    
    // console.log('rec.mes. after', receivedMessages)
    // const params = useParams();
    // console.log('params: ', params)
    // console.log('IMP: ', IMP)
    //console.log('messagesByUniqueUsers2: ', messagesByUniqueUsers2)


    return (
        <div>
            <div className="wrapper-allUsers">
                <div className="allUsers">
                    {messages.length === 0 ? <div></div> : users.length === 0 ? <div></div> : 
                    <div>
                        {uniqueUsers.map(el => {
                                return (
                                    <NavLink key={el._id} to={`/${currentUserId}/me/messages/${el._id}`}>
                                    <Message key={el._id}
                                    user={el}
                                    users={users}
                                    messages={messages}
                                    currentUserId={currentUserId}
                                ></Message>
                                </NavLink>
                                )
                        })}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default MessagesPage;


//let newArray = [...new Set(messages.map(item => item.sentBy))];


