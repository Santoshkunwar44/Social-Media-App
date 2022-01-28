import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../Apicall";

//IMPORTING THE CONTEXT TO USE ITS STATE AND TO DISPATCH THE ACTION
import { AuthContext } from "../../Context/Authcontext";
import { CircularProgress } from "@material-ui/core";
export default function Login() {
  const email = useRef();
  const password = useRef();

  //GETTING THE VALUES FROM THE CONTEXT
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  // console.log(error);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Coffee Talk</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Coffee Talk
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <h4 className="loginTitle">Login to continue </h4>
            <form onSubmit={handleClick} action="">
              <input type="email" placeholder="Email" required ref={email} />
              <input
                type="password"
                placeholder="Password"
                required
                minLength={5}
                ref={password}
              />

              <button className="loginButton" type="submit">
                {isFetching ? (
                  <CircularProgress style={{ color: "white" }} size={"25px"} />
                ) : (
                  "Login"
                )}
              </button>
              <div className="lastOptions">
                <span className="text">Forgot Password</span>
                <span className="noAccount text">Do not have Account ?</span>
              </div>
            </form>

            {error && <span> Some Error Occour</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
