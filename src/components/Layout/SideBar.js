import { useSelector } from "react-redux";
import "./SideBar.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";

const SideBar = () => {
  const emails = useSelector((state) => state.Email.emails);
  const loggedInEmail = useSelector((state) => state.Auth.email);

  const filteredList = emails.filter((email) => {
    return email.to === loggedInEmail;
  });

  let count = 0;

  for (let i = 0; i < filteredList.length; i++) {
    if (filteredList[i].read === false) {
      count++;
    }
  }

  return (
    <div className="sidebar col-md-2">
      <nav className="navbar">
        <ul className="navbar-nav flex-column mt-2 mt-sm-0">
          <li className="nav-item">
            <NavLink to="/mailbox" className="nav-link">
              <Button
                startIcon={<CreateOutlinedIcon />}
                className="compose_btn"
              >
                Compose
              </Button>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/inbox" className="nav-link">
              <div className="sidebar_options">
                <InboxIcon />
                <h2>Inbox</h2>
                <p>{count}</p>
              </div>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/sentbox" className="nav-link">
              <div className="sidebar_options">
                <SendIcon />
                <h2>Sentbox</h2>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
