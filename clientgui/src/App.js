import Home from "./Pages/Home/Home";
import Profile from "../src/Pages/Profile/Profile";
import Login from "../src/Pages/login/Login";
import Register from "../src/Pages/register/Register";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      {/* <Profile/>   */}
      {/* <Login/> */}
      {/* <Register/> */}
    </>
  );
}

export default App;
