import "./App.css";
import UserAuthentication from "./components/Auth/UserAuthentication";
import { Redirect, Route, Switch } from "react-router-dom";
import MailBox from './components/MailBox/MailBox';
import { useSelector } from "react-redux";
import Header from "./components/Layout/Header";
import Inbox from './components/MailBox/Inbox';
import EmailDetail from "./components/MailBox/EmailDetail";
import SentBox from './components/MailBox/SentBox';
import SideBar from "./components/Layout/SideBar";

function App() {
  const showFullEmail = useSelector((state) => state.Email.showFullEmail);
  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);

  return (
    <>
      <Header />
      <Switch>
        {!isLoggedIn && <Route exact path="/" component={UserAuthentication} />}
        {isLoggedIn && (
          <Route exact path="/mailbox">
            <MailBox />
          </Route>
        )}
        {isLoggedIn && (

          <Route exact path="/inbox">
            <Inbox />
            {showFullEmail && <EmailDetail />}
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/sentbox">
            <SentBox />
            {showFullEmail && <EmailDetail />}
          </Route>
        )}
        {isLoggedIn && (
          <Route path="*">
            <Redirect to="/inbox" />
          </Route>
        )}
        {!isLoggedIn && (
          <Route path="*">
            <Redirect to="/" />
          </Route>
        )}
      </Switch>
    </>
  );
}

export default App;
