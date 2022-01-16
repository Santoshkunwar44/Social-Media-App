import "./login.css"

export default function Login() {
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
              <h4  className="loginTitle">Login to continue </h4>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button className="loginButton">Login</button>
            <div className="lastOptions">
            <span className="text">Forgot Password</span>
            <span  className="noAccount text">Do not have Account ?</span>
            </div>
      
          </div>
        </div>
      </div>
    </div>
  );
}
