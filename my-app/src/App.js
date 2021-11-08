import './App.css';
import User from './components/User';
import Header from './components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import RegistrationForm from './components/Registration-form/RegistrationForm';
import {useSelector, useDispatch} from 'react-redux';
import { appSelector } from './store/appreducer/appReducer';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import UserProfile from './components/UserProfile/UserProfile';
import Users from './components/UsersList/Users';
import OwnUserHomePage from './components/OwnUserHomePage/OwnUserHomePage.js';
import Blog from './components/Blog/Blog';



function App() {

  const {loading, auth} = useSelector(appSelector);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(authSuccess())
  // }, [dispatch])

  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='login' element={<Login/>} />
        <Route path='users/*' element={<Users/>} ></Route>
        <Route path='registration' element={<RegistrationForm/>} ></Route>
        <Route path=':id/*' element={<OwnUserHomePage/>} ></Route>
        <Route path=':id/profile' element={<UserProfile/>} ></Route>
        <Route path='blog' element={<Blog/>} ></Route>

      </Routes>
    </div>
  );
}

export default App;
