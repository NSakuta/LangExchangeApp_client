import './Home.css'
import bg from '../../img-svg/26451688.jpg'


const Home = () => {
    return (
        <div id="home-wrapper">
            <img id="home-bg" src={bg} alt="bg-home"></img>
            <div id="home-text">
                <h1 id="home-text-h1">Practice with Us!</h1>
            </div>
        </div>
    )
}

export default Home;