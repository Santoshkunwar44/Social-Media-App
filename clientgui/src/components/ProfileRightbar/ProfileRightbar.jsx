import React from "react";
import "./rightbar.css";
export default function ProfileRightbar() {
  return (
    <div>
      <h4>User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoDesc">
          <div className="rightbarInfoItem">
            <h5>City :</h5>
            <span>{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <h5>From :</h5>
            <span>{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <h5>Gender:</h5>
            <span>{user.gender}</span>
          </div>
          <div className="rightbarInfoItem">
            <h5>Relationship :</h5>
            <span>{user.relationship}</span>
          </div>
        </div>
        <h4 className="followingText">User Followings</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <div className="following">
              <img
                src={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : "/assets/nouser.jpg"
                }
                alt=""
              />
              <span>{friend.username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
