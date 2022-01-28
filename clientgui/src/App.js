import Home from "./Pages/Home/Home";
import Profile from "../src/Pages/Profile/Profile";
import Login from "../src/Pages/login/Login";
import Register from "../src/Pages/register/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/Authcontext";
import  Messenger  from "../src/Pages/Messenger/Messenger";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Login />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/Register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
        <Route
          path="/messenger"
          element={user ? <Messenger/> : <Register />}
        />
      </Routes>
      {/* <Profile/>   */}
      {/* <Login/> */}
      {/* <Register/> */}
    </>
  );
}

export default App;

//loginbutton :disable while fetching
