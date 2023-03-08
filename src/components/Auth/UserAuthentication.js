import { useRef, useState } from "react";
import { AuthActions } from "../../redux-store/AuthSlice";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserAuthentication = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const history = useHistory()
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsZM900THTyef0IEB6khvCxK-DIEISlfw";

    if (isLogIn) {
      url =
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
    }else{
        if (
            emailRef.current.value.length === 0 ||
            passwordRef.current.value.length === 0 ||
            confirmPasswordRef.current.value.length === 0
            ) {
              alert("Please fill all field");
              return;
            }
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if(isLogIn){
            dispatch(AuthActions.setToken(data.idToken))
            history.push('/mailbox')
        }else{
            console.log("User has successfully signed up.");
        }
      } else {
        throw new Error(data.error.message);
      }
    } catch (e) {
      alert(e);
    }
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
