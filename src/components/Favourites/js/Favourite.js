import '../css/Favourite.css';


const Favourite = ({user}) => {
    return (
        <div id="user-fav-box">
            <div id="user-fav-img" style={{"background": `url(${user.img}) no-repeat center`, "backgroundSize":"cover"}}>
            </div>
            <div id="user-fav-info">
                <div id="user-fav-mainInfo">
                    <h4 className="user-fav-name">{user.firstName} {user.lastName}</h4>
                    <p className="user-fav-card-text">Native: </p><p className="user-fav-card-text">{user.nativeLanguage}</p><p className="user-card-text"> | </p>
                    <p className="user-fav-card-text">Practice: </p><p className="user-fav-card-text">{user.practiceLanguage}</p>
                    <br/>
                    <br/>
                    {/* <p className="user-fav-card-text">{user.about}</p> */}
                </div>
            </div>
        </div>
    )
}

export default Favourite;