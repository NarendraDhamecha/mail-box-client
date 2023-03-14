import { useRef, useState } from "react";
import { AuthActions } from "../../redux-store/AuthSlice";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/use-fetch";

const UserAuthentication = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const history = useHistory();
  const dispatch = useDispatch();
  const sendReq = useFetch();

  const afterSuccessReq = (data) => {
    if (isLogIn) {
      dispatch(
        AuthActions.setToken({ token: data.idToken, email: data.email })
      );
      history.push("/mailbox");
    } else {
      setIsLogIn(true);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let URL =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsZM900THTyef0IEB6khvCxK-DIEISlfw";

    if (isLogIn) {
      URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsZM900THTyef0IEB6khvCxK-DIEISlfw";
    }

    if (isLogIn) {
      if (
        emailRef.current.value.length === 0 ||
        passwordRef.current.value.length === 0
      ) {
        alert("Please fill all field");
        return;
      }
    } 

    if (!isLogIn) {
      if (
        emailRef.current.value.length === 0 ||
        passwordRef.current.value.length === 0 ||
        confirmPasswordRef.current.value.length === 0
      ) {
        alert("Please fill all field");
        return;
      }
    } 

    sendReq(
      {
        url: URL,
        method: "POST",
        body: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        },
      },
      afterSuccessReq
    );
  };

  const isLogInHandler = () => {
    setIsLogIn(!isLogIn);
  };

  let header = "LOG IN";

  if (!isLogIn) {
    header = "SIGN UP";
  }

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-md-4 col-10 mx-auto">
          <div className="card mt-5">
            <h3 className="card-header">{header}</h3>
            <div className="card-body">
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input className="form-control" type="email" ref={emailRef} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    minLength="6"
                    ref={passwordRef}
                  />
                </div>
                {!isLogIn && (
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      className="form-control"
                      type="password"
                      minLength="6"
                      ref={confirmPasswordRef}
                    />
                  </div>
                )}
                <button className="btn btn-outline-primary" type="submit">
                  {header}
                </button>
              </form>
              <button
                onClick={isLogInHandler}
                className="btn btn-outline-dark mt-3 btn-sm"
              >
                {isLogIn ? "Sign Up" : "Log In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;
