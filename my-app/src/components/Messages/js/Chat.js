const Chat = ({messages, currentUserId, id}) => {

    let allMessagedByTwoUsers = messages.filter(
        el => (el.sentBy === id && el.recipient === currentUserId)
            || (el.sentBy === currentUserId && el.recipient === id)
    );

    console.log('messages:', messages)

    return (
        <div>
            {allMessagedByTwoUsers.map((el, index) => {
                        const fullDate = el.createdAt.split('T')[0]
                        const fullTime = el.createdAt.split('T')[1]
                        const date = fullDate.split('-')[2] + '.' + fullDate.split('-')[1]
                        const time = fullTime.split(':')[0] + ':' + fullTime.split(':')[1]

                        if(el.sentBy === currentUserId) {
                            return (
                                    <div key={index} className="right">{el.text}
                                        <p id="sign">me</p>
                                        <p className="dateAnDTimeRight">{date}   {time}</p>
                                    </div>
                                )
                        } else {
                            return (
                                    <div key={index} className="left">
                                        {el.text}
                                        <p className="dateAnDTimeLeft">{date}   {time}</p>
                                    </div>
                            )
                        }
                    }
                )}     
        </div>
    )
}

export default Chat;