import { NavLink } from "react-router-dom";

const SideBar = () => {
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
              Inbox
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/sentbox" className="nav-link text-light">
              Sentbox
            </NavLink>
          </li>
          <li className="nav-item ms-3 mt-3">
              <button className="btn btn-primary btn-sm">Log Out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
