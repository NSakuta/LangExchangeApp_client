import './App.css';
import Header from './components/Header/Header';
import {Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/Registration-form/js/Registration';
import {useDispatch } from 'react-redux';
import { authSuccess } from './store/appreducer/appReducer';
import Login from './components/Login/js/Login';
import Home from './components/Home/Home';
import Users from './components/UsersList/js/UsersList';
import UserHomePage from './components/UserHomePage/UserHomePage.js';
import Blog from './components/Blog/Blog';
import MenuLeftRoutes from './components/MenuLeft/js/MenuLeftRoutes'
import UserView from './components/UserView/js/UserView';
import UsersListFilterByTwoLanguages from './components/UsersList/js/UsersListFilterByTwoLanguages';
import UsersListFilterByNativeLanguage from './components/UsersList/js/UsersListFilterByNativeLanguage';
import UsersListFilterByPracticeLanguage from './components/UsersList/js/UsersListFilterByPracticeLanguage';

function App() {

const dispatch = useDispatch();

dispatch(authSuccess())


  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='auth/login' element={<Login/>} />
        <Route path='auth/signup' element={<RegistrationForm/>} ></Route>
        <Route path='users/*' element={<Users/>} ></Route>
        <Route path='users/:id' element={<UserView/>} ></Route>
        <Route path='blog' element={<Blog/>} ></Route>
        <Route path='user/:id/*' element={<UserHomePage/>} ></Route>
        <Route path='user/:id/me/*' element={<MenuLeftRoutes/>}></Route>
        <Route path='/users/native=:native/practice=:practice' element={<UsersListFilterByTwoLanguages/>}></Route>
        <Route path='/users/native=:native' element={<UsersListFilterByNativeLanguage/>}></Route>
        <Route path='/users/practice=:practice' element={<UsersListFilterByPracticeLanguage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
