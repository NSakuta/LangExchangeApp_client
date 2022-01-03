import img from "../../img-svg/copy_of_web_program_service_banner_template_14.png"
import './UserHomePage.css'

const UserHomePage = () => {
    return (
        <div className="box-welcome">
            <img id="img-welcome" src={img} alt="welcome-img">
            </img>
            <p>Welcome to your home page</p>
        </div>
    )
}

export default UserHomePage;