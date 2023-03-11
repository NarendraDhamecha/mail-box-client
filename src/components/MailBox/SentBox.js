import SideBar from "../Layout/SideBar";
import EmailList from "./EmailList";
import { EmailActions } from "../../redux-store/EmailDataSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const SentBox = () => {
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
          message: data[i].message,
          read: data[i].read,
        });
      }
      dispatch(EmailActions.setEmail(emails));
    };
    getEmailData();
  }, [dispatch]);

  const filteredList = emailData.filter((email) => {
    return email.from === LoggedInemail;
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <div className="col-md-10 col-10">
          {filteredList.map((email) => {
            return (
              <EmailList
                id={email.id}
                to={email.to}
                from={email.from}
                key={email.id}
                email={email.to}
                subject={email.subject}
                message={email.message}
                read={true}
                to_from={'to'}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SentBox;
