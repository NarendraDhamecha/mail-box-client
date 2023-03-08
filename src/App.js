// import './App.css';
import UserAuthentication from './components/Auth/UserAuthentication';
import { Route, Switch } from 'react-router-dom';
import MailBox from './components/MailBox/MailBox';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.Auth.isLoggedIn);

  return (
    <>
    <Switch>
      {isLoggedIn && <Route exact path='/mailbox' component={MailBox}/>}
      <Route exact path='/' component={UserAuthentication}/>
    </Switch>
    </>
  );
}

export default App;
