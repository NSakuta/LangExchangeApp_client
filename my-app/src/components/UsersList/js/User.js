import '../css/User.css';
import '../../../App.css'



const User = ({user}) => {

    return (
        <div>
            <div id="user-img" style={{"background": `url(${user.img}) no-repeat center`, "backgroundSize":"cover"}}>
            </div>
            <div id="user-info">
                <div id="user-mainInfo">
                    <h4 className="user-name">{user.firstName} {user.lastName}</h4>
                    <p className="user-card-text">Native: </p><p className="user-card-text">{user.nativeLanguage}</p><p className="user-card-text"> | </p>
                    <p className="user-card-text">Practice: </p><p className="user-card-text">{user.practiceLanguage}</p>
                    <br/>
                    <br/>
                    <p className="user-card-text">{user.about}</p>
                </div>
            </div>
        </div>
    )
}

export default User;