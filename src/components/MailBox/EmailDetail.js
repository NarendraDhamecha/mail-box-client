import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { EmailActions } from "../../redux-store/EmailDataSlice";
import ModalOverlay from "../UI/ModalOverlays";

const EmailDetail = () => {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(EmailActions.setShowFullEmail());
  };

  const fullMsg = useSelector((state) => state.Email.emailMsg);

  useEffect(() => {
    if (fullMsg) {
      const updatedFullMsg = JSON.stringify(fullMsg);
      localStorage.setItem("emaildetail", updatedFullMsg);
    } else {
      const emailMsg = localStorage.getItem("emaildetail");
      dispatch(EmailActions.setEmailMsg(JSON.parse(emailMsg)));
    }
  }, [fullMsg, dispatch]);

  return (
    <ModalOverlay>
      <div className="row">
        <div className="col-md-8 col-10 mx-auto">
          <div className="card my-5">
            {fullMsg && (
              <p className="card-header d-flex">
                <b>{fullMsg.from_to}</b> : {fullMsg.email}
                <button
                  onClick={onClose}
                  className="bt btn-close ms-auto"
                ></button>
              </p>
            )}
            <div className="card-body">
              {fullMsg && (
                <p className="card-title">
                  <b>Subject</b> : {fullMsg.subject}
                </p>
              )}
              <div className="mt-4 ps-2 pt-2 border border-1 rounded">
                {fullMsg && (
                  <p>
                    <b>Message</b> : {fullMsg.message}
                  </p>
                )}
              </div>
              <div className="text-end mt-3">
                <button className="btn btn-outline-dark" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default EmailDetail;
