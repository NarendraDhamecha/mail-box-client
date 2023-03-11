import "./EmailList.css";
import { EmailActions } from "../../redux-store/EmailDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const EmailList = (props) => {
  const emails = useSelector((state) => state.Email.emails);
  const dispatch = useDispatch();
  const history = useHistory();

  const setEmailDetailMsg = async () => {
    dispatch(
      EmailActions.setEmailMsg({
        subject: props.subject,
        email: props.email,
        message: props.message,
        to_from: props.to_from,
      })
    );
    history.push("/emaildetail");
    if (!props.read) {
      try {
        const res = await fetch(
          `https://mail-box-client-bcd20-default-rtdb.firebaseio.com/email/${props.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              to: props.to,
              from: props.from,
              subject: props.subject,
              message: props.message,
              read: true,
            }),
          }
        );

        if (res.ok) {
          console.log("success");
        }
      } catch (e) {}
    }
  };

  const deleteEmailHandler = async () => {
    try {
      const res = await fetch(
        `https://mail-box-client-bcd20-default-rtdb.firebaseio.com/email/${props.id}.json`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        const updatedList = emails.filter((email) => {
          return email.id !== props.id;
        });

        dispatch(EmailActions.setEmail(updatedList));
      }
    } catch (e) {}
  };

  return (
    <div className="emailbody">
      {!props.read && <span className="me-2 mb-2">•</span>}
      <div className="emailbody_left" onClick={setEmailDetailMsg}>
        <h5>{props.email}</h5>
      </div>
      <div className="emailbody_middle">
        <p className="emailbody_middle__msg">
          <b>{props.subject}</b> {props.message}
        </p>
      </div>
      <div className="emailbody_right">
        <p>02:30 PM</p>
      </div>
      <div>
        <button onClick={deleteEmailHandler} className="btn btn-danger btn-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmailList;
