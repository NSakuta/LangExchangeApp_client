import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import {Route, Routes, Navigate} from 'react-router-dom';
import RegistrationForm from './components/Registration-form/js/RegistrationForm';
import {useSelector, useDispatch} from 'react-redux';
import { authSelector } from './store/appreducer/appReducer';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Users from './components/UsersList/Users';
import userHomePage from './components/userHomePage/userHomePage.js';
import Blog from './components/Blog/Blog';
import MenuLeftRoutes from './MenuLeft/MenuLeftRoutes';


export const AppContext = React.createContext();

function App() {

  const {auth} = useSelector(authSelector);
  // const dispatch = useDispatch();

  const findReceivedMessagesByUserId = (id, array) => {
    let receivedMessages = [];

    if (id !== null) {
        receivedMessages = array.filter(el => el.recipient === id);
    } 
    return receivedMessages;
}

const findSentMessagesByUserId = (id, array) => {
  let sentMessages = [];

  if (id !== null) {
      sentMessages = array.filter(el => el.sentBy === id);
  }
  return sentMessages;
}

const findUserById = (array, id) => {
  return array.find(el => el._id === id)
}

const getCurrentUserIdFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('USER_ID')) || null;
}

console.log('auth: ', auth)

  return (
    <div>
      <AppContext.Provider value = {{
        findReceivedMessagesByUserId,
        findSentMessagesByUserId,
        findUserById,
        getCurrentUserIdFromLocalStorage
      }}>
      <Header/>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='login' element={<Login/>} />
        <Route path='users/*' element={<Users/>} ></Route>
        <Route path='signup' element={<RegistrationForm/>} ></Route>
        <Route path=':id/*' element={<userHomePage/>} ></Route>
        {/* <Route path=':id/me/*' element={<UserProfile/>}></Route> */}
        <Route path='blog' element={<Blog/>} ></Route>
        <Route path=':id/me/*' element={<MenuLeftRoutes/>}></Route>
      </Routes>
        {auth && <Navigate from='login' to='blog'></Navigate>}
      </AppContext.Provider>
    </div>
  );
}

export default App;
