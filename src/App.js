// import './App.css';
import UserAuthentication from './components/Auth/UserAuthentication';
import { Redirect, Route, Switch } from 'react-router-dom';
import MailBox from './components/MailBox/MailBox';
import { useSelector } from 'react-redux';
import Header from './components/Layout/Header';
import Inbox from './components/MailBox/Inbox';
import EmailDetail from "./components/MailBox/EmailDetail";
import SentBox from './components/MailBox/SentBox';

function App() {
  const isLoggedIn = useSelector(state => state.Auth.isLoggedIn);

  return (
    <>
    <Header/>
    <Switch>
      {!isLoggedIn && <Route exact path='/' component={UserAuthentication}/>}
      {isLoggedIn && <Route exact path='/mailbox' component={MailBox}/>}
      {isLoggedIn && <Route exact path='/inbox' component={Inbox}/>}
      {isLoggedIn && <Route exact path='/sentbox' component={SentBox}/>}
      {isLoggedIn && <Route path='/emaildetail' component={EmailDetail}/>}
      {isLoggedIn && <Route path='*'><Redirect to='/inbox'/></Route>}
      {!isLoggedIn && <Route path='*'><Redirect to='/'/></Route>}
    </Switch>
    </>
  );
}

export default App;
