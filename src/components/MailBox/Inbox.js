import SideBar from "../Layout/SideBar";
import EmailList from "./EmailList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmailActions } from "../../redux-store/EmailDataSlice";

const Inbox = () => {
  const LoggedInemail = useSelector((state) => state.Auth.email);
  const emailData = useSelector((state) => state.Email.emails);
  const dispatch = useDispatch();

  useEffect(() => {
    const getEmailData = async () => {
      const res = await fetch(
        "https://mail-box-client-bcd20-default-rtdb.firebaseio.com/email.json"
      );
      const data = await res.json();

      let emails = [];

      for (let i in data) {
        emails.push({
          id: i,
          to: data[i].to,
          from: data[i].from,
          subject: data[i].subject,
          message: data[i].message
        });
      }
      dispatch(EmailActions.setEmail(emails));
    };
    getEmailData();
  }, []);

  const filteredList = emailData.filter((email) => {
    return email.to === LoggedInemail;
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <div className="col-md-10 col-10">
        {console.log(filteredList)}
          {filteredList.map((email) => {
            return (
              <EmailList
                key={email.id}
                email={email.from}
                subject={email.subject}
                message={email.message}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
