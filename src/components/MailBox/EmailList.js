import "./EmailList.css";
import { EmailActions } from "../../redux-store/EmailDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useFetch from "../../hooks/use-fetch";

const EmailList = (props) => {
  const emails = useSelector((state) => state.Email.emails);
  const dispatch = useDispatch();
  const history = useHistory();
  const updateReq = useFetch();

  let email = null;
  let from_to = null;

  if (props.match === "inbox") {
    email = props.from;
    from_to = "from";
  } else {
    email = props.to;
    from_to = "to";
  }

  const updatedList = () => {
    const updatedList = emails.filter((email) => {
      return email.id !== props.id;
    });

    dispatch(EmailActions.setEmail(updatedList));
  };

  const setEmailDetailMsg = async () => {
    dispatch(
      EmailActions.setEmailMsg({
        subject: props.subject,
        email: email,
        message: props.message,
        from_to,
      })
    );
    history.push("/emaildetail");

    if (props.match === "inbox") {
      updateReq({
        url: `https://mail-box-client-bcd20-default-rtdb.firebaseio.com/email/${props.id}.json`,
        method: "PUT",
        body: {
          to: props.to,
          from: props.from,
          subject: props.subject,
          message: props.message,
          read: true,
        },
      });
    }
  };

  const deleteEmailHandler = async () => {
    updateReq(
      {
        url: `https://mail-box-client-bcd20-default-rtdb.firebaseio.com/email/${props.id}.json`,
        method: "DELETE",
      },
      updatedList
    );
  };

  return (
    <div className="emailbody">
      {props.match === 'inbox' && !props.read && <span className="me-2 mb-2">•</span>}
      <div className="emailbody_left" onClick={setEmailDetailMsg}>
        <h5>{email}</h5>
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
