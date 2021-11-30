import '../css/User.css';
import '../../../App.css'


const User = ({user}) => {

    return (
        <div>
            <div id="user-img" style={{"background": `url(${user.img}) no-repeat center`, "backgroundSize":"115%"}}>
                {/* <img src={user.img} alt=""></img> */}
            </div>
            <div id="user-info">
                <div id="user-mainInfo">
                    <h4 className="user-name">{user.firstName}, {user.lastName}</h4>
                    <h6 className="user-languages">Native language: </h6><h6 className="user-languages">{user.nativeLanguage}</h6><br/>
                    <h6 className="user-languages">Practice language: </h6><h6 className="user-languages">{user.practiceLanguage}</h6>
                </div>
                <p>{user.interests}</p>
            </div>
        </div>
    )
}

export default User;