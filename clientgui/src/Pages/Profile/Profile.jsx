import "../Home/Home.css";
import "./profile.css";
import Feed from "../../components/Feedbar/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileImages">
              <img className="coverImage" src="/assets/5.jpg" alt="" />
              <img className="profileImage" src="/assets/1.jpg" alt="" />
            </div>
            <div className="profileInfo">
                <h2>Santosh Kunwar Chhetri</h2>
                <span>hey its santosh ! How are you</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
