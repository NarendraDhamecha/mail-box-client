import "./EmailList.css";

const EmailList = (props) => {
    return (
        <div className="emailbody">
            <div className="emailbody_left">
              <h5>{props.email}</h5>
            </div>
            <div className="emailbody_middle">
              <p>
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