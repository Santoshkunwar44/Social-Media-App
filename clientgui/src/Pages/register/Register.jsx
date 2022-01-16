import "./register.css"

export default function Register() {
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
              <h4  className="RegisterTitle">Register to continue </h4>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button className="RegisterButton">Register</button>
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
