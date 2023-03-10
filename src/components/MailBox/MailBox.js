import { useRef } from "react";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import SideBar from "../Layout/SideBar";

const MailBox = () => {
  const editorRef = useRef("");
  const toRef = useRef("");
  const subjectRef = useRef("");
  const from = useSelector(state => state.Auth.email);

  const config = {
    placeholder: "Start typing your email...",
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


    try {
      const response = await fetch(
        "https://mail-box-client-bcd20-default-rtdb.firebaseio.com/email.json",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            from,
            to,
            subject,
            message,
          }),
        }
      );

      const data = await response.json();
      

      if (response.ok) {
        toRef.current.value = '';
        subjectRef.current.value = '';
        alert('email sent successfully');
      } else {
        throw new Error(data.error.message);
      }
    } catch (e) {
       alert(e);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar/>
        <div className="col-md-5 col-10 mx-auto">
          <form className="mt-5" onSubmit={submitHandler}>
            <div className="mb-2">
              <input className="form-control" placeholder="To" ref={toRef} />
            </div>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Subject"
                ref={subjectRef}
              />
            </div>
            <div className="mb-2">
              <JoditEditor ref={editorRef} config={config} />
            </div>
            <button className="btn btn-outline-primary btn-sm" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MailBox;
