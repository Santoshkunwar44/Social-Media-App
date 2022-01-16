import "./Home.css"
import Feed from "../../components/Feedbar/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="bodyWrapper">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
