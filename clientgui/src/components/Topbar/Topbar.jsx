import React from "react";
import "./topbar.css";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="leftTopbar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 className="main_title"> Lets Talk </h2>
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
          <span>Homepage</span>
          <span>Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person className="t-icon" />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat className="t-icon" />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications className="t-icon" />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to="/profile/:username">
          <img className="topbarImg" src="/assets/1.jpg" alt="" />{" "}
        </Link>
      </div>
    </div>
  );
}
