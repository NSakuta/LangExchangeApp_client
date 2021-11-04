import './App.css';
import User from './components/User';
import Header from './components/Header/Header';
import {Route, Switch} from 'react-router-dom';


function App() {

  return (
    <div>
      <Header/>
      <User></User>
    </div>
  );
}

export default App;
