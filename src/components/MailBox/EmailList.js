import "./EmailList.css";
import { EmailActions } from "../../redux-store/EmailDataSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const EmailList = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const setEmailDetailMsg = async () => {
    dispatch(EmailActions.setEmailMsg({
      subject: props.subject,
      email: props.email,
      message: props.message
    }))
    history.push('/emaildetail')

    try{
      const res = await fetch(`https://mail-box-client-bcd20-default-rtdb.firebaseio.com/email/${props.id}.json`,{
        method: "PUT",
        body: JSON.stringify({
          to: props.to,
          from: props.email,
          subject: props.subject,
          message: props.message,
          read: true
        })
      })

      if(res.ok){
        console.log('success')
      }
    }catch(e){

    }
  }

    return (
        <div className="emailbody" onClick={setEmailDetailMsg}>
            {!props.read && <span className="me-2 mb-2">•</span>}
            <div className="emailbody_left">
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
          </div>
    )
}

export default EmailList;