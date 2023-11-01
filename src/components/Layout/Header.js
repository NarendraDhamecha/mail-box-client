import { AuthActions } from "../../redux-store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.Auth.isLoggedIn);
  const history = useHistory();

  const logOutHandler = () => {
    dispatch(AuthActions.logOut())
    history.replace('/');
 }
  return (
    <div className="container-fluid main_header">
      <div className="row">
        <div className="col-md-12 d-flex justify-content-between align-items-center">
          <header>
            <h1>Mail Box</h1>
          </header>
          {isLoggedIn && <button className="btn btn-danger btn-sm" onClick={logOutHandler}><LogoutIcon/></button>}
        </div>
      </div>
    </div>
  );
};

export default Header;
