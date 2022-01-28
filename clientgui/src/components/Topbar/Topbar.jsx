import React, { useContext } from "react";
import "./topbar.css";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Authcontext";
export default function Topbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="topbar">
      <>
        <div className="leftTopbar">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h2 className="main_title"> Lets Talk {user.username} </h2>
          </Link>
        </div>
        <div className="middleTopbar">
          <div className="searchbar">
            <Search />
            <input
              className="searchInput"
              type="text"
              placeholder="Search friend ,post  , videos"
            />    
          </div>
        </div>
        <div className="rightTopbar">
          <div className="topbarLinks">
            <Link to='/'>

              <span>Homepage</span>


            </Link>
            <Link to='/messenger'>
              <span>My chats</span>

            </Link>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">

              <Person className="t-icon" />
              {/* <span className="topbarIconBadge"></span> */}
            </div>

            <div className="topbarIconItem">
              <Link to="/messenger">              <Chat className="t-icon" /> </Link>
              {/* <span className="topbarIconBadge"></span> </Link> */}

            </div>
            <div className="topbarIconItem">
              <Notifications className="t-icon" />
              {/* <span className="topbarIconBadge"></span> */}
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              className="topbarImg"
              src={user.profilePicture || "/assets/nouser.jpg"}
              alt=""
            />
          </Link>
        </div>
      </>
    </div>
  );
}
