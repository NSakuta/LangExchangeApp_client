import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import RegistrationForm from './components/Registration-form/js/RegistrationForm';
import {useSelector, useDispatch} from 'react-redux';
import { appSelector } from './store/appreducer/appReducer';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Users from './components/UsersList/Users';
import OwnUserHomePage from './components/OwnUserHomePage/OwnUserHomePage.js';
import Blog from './components/Blog/Blog';
import MenuLeftRoutes from './MenuLeft/MenuLeftRoutes';


export const AppContext = React.createContext();

function App() {

  // const {loading, auth} = useSelector(appSelector);
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

  return (
    <div>
      <AppContext.Provider value = {{
        findReceivedMessagesByUserId,
        findSentMessagesByUserId
      }}>
      <Header/>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='login' element={<Login/>} />
        <Route path='users/*' element={<Users/>} ></Route>
        <Route path='registration' element={<RegistrationForm/>} ></Route>
        <Route path=':id/*' element={<OwnUserHomePage/>} ></Route>
        {/* <Route path=':id/me/*' element={<UserProfile/>}></Route> */}
        <Route path='blog' element={<Blog/>} ></Route>
        <Route path=':id/me/*' element={<MenuLeftRoutes/>}></Route>
      </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
