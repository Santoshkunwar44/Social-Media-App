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
  const [user, setUser] = useState({});
  const username = useParams().username;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosCall.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);


  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileImages">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture ? user.coverPicture : "/assets/nouser.jpg"
                }
                alt=""
              />
              <img
                className="profileImage"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "/assets/nouser.jpg"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar myusers={user} />
          </div>
        </div>
      </div>
    </>
  );
}
