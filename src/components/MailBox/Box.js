import SideBar from "../Layout/SideBar";
import EmailList from "./EmailList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { EmailActions } from "../../redux-store/EmailDataSlice";
import useFetch from "../../hooks/use-fetch";

const Box = (props) => {
  const dispatch = useDispatch();
  const { filteredList, match } = props;
  const { sendHttpReq: getEmailData } = useFetch();

  useEffect(() => {
    const afterGetEmailData = (data) => {
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
      if (match === "inbox") dispatch(EmailActions.setEmail(emails));
      else dispatch(EmailActions.setSentBoxEmails(emails));
    };

    // const afterGetSentEmailData = (data) => {
    //   let emails = [];

    //     for (let i in data) {
    //       emails.push({
    //         id: i,
    //         to: data[i].to,
    //         from: data[i].from,
    //         subject: data[i].subject,
    //         message: data[i].message,
    //         read: data[i].read,
    //       });
    //     }
    //     dispatch(EmailActions.setSentBoxEmails(emails));
    // }
    if (match === "inbox")
      getEmailData(
        {
          url: "https://mail-box-client-bcd20-default-rtdb.firebaseio.com/email.json",
        },
        afterGetEmailData
      );
    else
      getEmailData(
        {
          url: "https://mail-box-client-bcd20-default-rtdb.firebaseio.com/sent.json",
        },
        afterGetEmailData
      );
  }, [getEmailData, dispatch, match]);

  return (
    <div className="container-fluid">
      <div className="row">
         <SideBar/>
        <div className="col-md-10 col-10">
          {filteredList.map((email) => {
            return (
              <EmailList
                key={email.id}
                id={email.id}
                match={match}
                to={email.to}
                from={email.from}
                subject={email.subject}
                message={email.message}
                read={email.read}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Box;
