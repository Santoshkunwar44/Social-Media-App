import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosCall from "../../axios";
import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  //making the api request

  const handleClick = async (e) => {
    e.preventDefault();

    if (password.current.value !== confirmPassword.current.value) {
      console.log(password.current.value);
      console.log(confirmPassword.current.value);
      confirmPassword.current.setCustomValidity("Password do not match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        const response = await axiosCall.post("/auth/register", user);
        console.log(response);
        response.data &&   window.location.replace("/login");
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <div className="Register">
      <div className="RegisterWrapper">
        <div className="RegisterLeft">
          <h3 className="RegisterLogo">Coffee Talk</h3>
          <span className="RegisterDesc">
            Connect with friends and the world around you on Coffee Talk
          </span>
        </div>
        <div className="RegisterRight">
          <div className="RegisterBox">
            <h4 className="RegisterTitle">Register to continue </h4>
            <form onSubmit={handleClick}>
              <input type="text" ref={username} placeholder="username" />
              <input type="email" ref={email} placeholder="Email" />
              <input type="password" ref={password} placeholder="Password" />
              <input
                type="password"
                ref={confirmPassword}
                placeholder="Confirm Password"
              />
              <button type="submit" className="RegisterButton">
                Register
              </button>
            </form>

            <div className="lastOptions">
              <span className="text">Forgot Password</span>
              <Link to="/login">
                <span className="noAccount text">Already have Account ?</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
