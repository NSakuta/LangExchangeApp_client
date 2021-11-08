import './App.css';
import User from './components/User';
import Header from './components/Header/Header';
import {Route, Switch} from 'react-router-dom';
import RegistrationForm from './components/Registration-form/RegistrationForm';


function App() {

  return (
    <div>
      <Header/>
      <User></User>
      <RegistrationForm></RegistrationForm>
    </div>
  );
}

export default App;
