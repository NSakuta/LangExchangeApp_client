import '../css/Message.css';

const Message = ({message, users}) => {

    const {sentBy, text} = message;

    const sentByUser = findUserById(users, sentBy);

    return (
        <div className="box-message">
            <div className="" style={{"backgroundImage": `${sentByUser.img}`}}>
                <img className="avatar" src={sentByUser.img} alt="img"></img>
            </div>
            <h3 className="msg-sentBy">{sentByUser.firstName}, {sentByUser.lastName}</h3>
            <p>{text}</p>
        </div>
    )
}

export default Message;

const findUserById = (array, id) => {
    return array.find(el => el._id === id)
}