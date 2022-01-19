import "../Home/Home.css";
import "./profile.css";
import Feed from "../../components/Feedbar/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axiosCall from "../../axios";
export default function Profile() {
  const [user, setUser] = useState();

  const params = useParams();
  const username = params.username;
  console.log(username);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosCall.get(`/users?username=santosh`);
      const data = await response.data.payload;
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileImages">
              <img
                className="coverImage"
                src={user && user.coverPicture}
                alt=""
              />
              <img
                className="profileImage"
                src={user && user.profilePicture}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h2> {user && user.username}</h2>
              <span>{user && user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user && user.username} />
            <Rightbar user={user && user} />
          </div>
        </div>
      </div>
    </>
  );
}
