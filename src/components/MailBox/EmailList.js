import "./EmailList.css";
import { EmailActions } from "../../redux-store/EmailDataSlice";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/use-fetch";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const EmailList = (props) => {
  const { id, match, to, from, subject, message, read } = props;
  const emails = useSelector((state) => state.Email.emails);
  const sentEmails = useSelector((state) => state.Email.sentBox);
  const dispatch = useDispatch();
  const { sendHttpReq: updateReq } = useFetch();

  let email = null;
  let from_to = null;

  if (match === "inbox") {
    email = from;
    from_to = "From";
  } else {
    email = to;
    from_to = "To";
  }

  const updatedList = () => {
    let emailsData = match === 'inbox' ? emails : sentEmails
    const updatedList = emailsData.filter((email) => {
      return email.id !== id;
    });
    
    if(match === 'inbox')
    dispatch(EmailActions.setEmail(updatedList));

    else
    dispatch(EmailActions.setSentBoxEmails(updatedList))
  };

  const updateRead = () => {
    const existingIndex = emails.findIndex((email) => email.id === id);
    dispatch(EmailActions.setReadMsg(existingIndex));
  };

  const setEmailDetailMsg = async () => {
    dispatch(
      EmailActions.setEmailMsg({
        subject,
        email,
        message,
        from_to,
      })
    );

    dispatch(EmailActions.setShowFullEmail());

    if (match === "inbox" && !read) {
      updateReq(
        {
          url: `https://mail-box-client-bcd20-default-rtdb.firebaseio.com/email/${id}.json`,
          method: "PUT",
          body: {
            to,
            from,
            subject,
            message,
            read: true,
          },
        },
        updateRead
      );
    }
  };

  const deleteEmailHandler = async (e) => {
    e.stopPropagation();
    if(match === 'inbox'){
      updateReq(
        {
          url: `https://mail-box-client-bcd20-default-rtdb.firebaseio.com/email/${id}.json`,
          method: "DELETE",
        },
        updatedList
      );
    }
    else{
      updateReq(
        {
          url: `https://mail-box-client-bcd20-default-rtdb.firebaseio.com/sent/${id}.json`,
          method: "DELETE",
        },
        updatedList
      );
    }
    // updateReq(
    //   {
    //     url: `https://mail-box-client-bcd20-default-rtdb.firebaseio.com/email/${id}.json`,
    //     method: "DELETE",
    //   },
    //   updatedList
    // );
  };

  return (
    <div className="emailbody" onClick={setEmailDetailMsg}>
      {match === 'inbox' && !read && <span className="me-1">»</span>}
      <div className="emailbody_left">
        <h5>{email}</h5>
      </div>
      <div className="emailbody_middle">
          <b>{subject}</b> {message}
      </div>
      {/* <div className="emailbody_right">
        <p>02:30 PM</p>
      </div> */}
      <div>
      <IconButton onClick={deleteEmailHandler}><DeleteIcon/></IconButton>
      </div>
    </div>
  );
};

export default EmailList;
