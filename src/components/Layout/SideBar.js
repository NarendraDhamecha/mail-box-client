import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { AuthActions } from "../../redux-store/AuthSlice";
import './SideBar.css';

const SideBar = () => {
  const emails = useSelector(state => state.Email.emails)
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedInEmail = useSelector(state => state.Auth.email);

  const logOutHandler = () => {
     dispatch(AuthActions.logOut())
     history.replace('/');
  }

  const filteredList = emails.filter((email) => {
    return email.to === loggedInEmail
  })

  let count = 0;

  for(let i = 0; i < filteredList.length; i++){
     if(filteredList[i].read === false){
      count ++;
     }
  }

  return (
    <div className="d-flex flex-column justify-content-between col-md-2 bg-dark min-vh-100">
      <div>
        <ul className="nav flex-column mt-2 mt-sm-0">
        <li className="nav-item">
            <NavLink to="/mailbox" className="nav-link text-light">
              Compose
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/inbox" className="nav-link text-light">
              Inbox <span className="badge">{count}</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/sentbox" className="nav-link text-light">
              Sentbox
            </NavLink>
          </li>
          <li className="nav-item ms-3 mt-3">
              <button className="btn btn-primary btn-sm" onClick={logOutHandler}>Log Out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
