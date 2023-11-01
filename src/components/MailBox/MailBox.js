import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../Layout/SideBar";
import useFetch from "../../hooks/use-fetch";
import { EmailActions } from "../../redux-store/EmailDataSlice";

const MailBox = () => {
  const editorRef = useRef("");
  const toRef = useRef("");
  const subjectRef = useRef("");
  const from = useSelector((state) => state.Auth.email);
  const dispatch = useDispatch();
  const {sendHttpReq: authReq, isLoading} = useFetch();

  const afterReq = (data) => {
    dispatch(EmailActions.setSingleEmail({
      id: data.name,
      from,
      to: toRef.current.value,
      subject: subjectRef.current.value,
      message: editorRef.current.value,
      read: false  
    }))
    toRef.current.value = "";
    subjectRef.current.value = "";
    editorRef.current.value = "";
    alert("email sent successfully");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const message = editorRef.current.value;
    const to = toRef.current.value;
    const subject = subjectRef.current.value;

    if (to.length === 0 || subject.length === 0 || message.length === 0) {
      alert("please fill all input field");
      return;
    }

    authReq(
      {
        url: "https://mail-box-client-bcd20-default-rtdb.firebaseio.com/email.json",
        method: "POST",
        body: {
          from,
          to,
          subject,
          message,
          read: false,
        },
      },
      afterReq
    );

    authReq(
      {
        url: "https://mail-box-client-bcd20-default-rtdb.firebaseio.com/sent.json",
        method: "POST",
        body: {
          from,
          to,
          subject,
          message,
          read: false,
        },
      }
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <div className="col-md-5 col-10 mx-auto">
          <form className="mt-5" onSubmit={submitHandler}>
            <div className="mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="To"
                ref={toRef}
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                ref={subjectRef}
              />
            </div>
            <div className="mb-2">
              <textarea
                className="form-control"
                ref={editorRef}
                placeholder="Message"
                rows="10"
              />
            </div>
            <div className="text-end">
              {!isLoading && <button className="btn btn-dark" type="submit">
                Send
              </button>}
              {isLoading && <h5>Sending email...</h5>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MailBox;
