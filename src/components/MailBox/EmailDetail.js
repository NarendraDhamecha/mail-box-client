import { useDispatch, useSelector } from "react-redux";
import SideBar from "../Layout/SideBar";
import { useEffect } from "react";
import { EmailActions } from "../../redux-store/EmailDataSlice";

const EmailDetail = () => {
  const dispatch = useDispatch();

  const fullMsg = useSelector((state) => state.Email.emailMsg);

  useEffect(() => {
    if (fullMsg) {
      const updatedFullMsg = JSON.stringify(fullMsg);
      localStorage.setItem("emaildetail", updatedFullMsg);
    } else {
      const emailMsg = localStorage.getItem("emaildetail");
      dispatch(EmailActions.setEmailMsg(JSON.parse(emailMsg)));
    }
  }, [fullMsg]);

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <div className="col-md-5 col-10">
          <div className="mt-3">
            <div className="text-start">
              {fullMsg && <h4>Subject : {fullMsg.subject}</h4>}
            </div>
            <div className="text-start">
              {fullMsg && <p>From : {fullMsg.email}</p>}
            </div>
            <div className="card mt-2 ms-5">
              <div className="card-body">
                <p>Message : {fullMsg.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
