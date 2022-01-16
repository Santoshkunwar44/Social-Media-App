import React from "react";
import "./rightbar.css";
import { users } from "../../dummydata";
export default function Rightbar() {
  const HomeRightbar = ({ profile }) => {
    return (
      <>
        <div className="birthdayContainr">
          <img
            className="birthdayImg"
            src="https://img.icons8.com/cotton/64/000000/birthday.png"
          />
          <span className="birthdayText">
            <b>Harry </b> and <b>3 others</b> have Birthday Today
          </span>
        </div>
        <div className="advertise">
          <img
            className="AdvertiseImg"
            src="/assets/add.jpg"
            alt="adverstisement"
          />
        </div>
        <hr />
        <div className="OnlineFriends">
          <h3>Online Friends</h3>
          <ul className="onlineFriendsWrapper">
            {users.map((user) => (
              <li className="onlineFriend">
                <div className="onlineFriendImgContainer">
                  <img
                    className="onlineFriendImg"
                    src={user.profilePicture}
                    alt="onlineFriend"
                  />

                  <div className="onlineStatus"></div>
                </div>

                <span className="onlinefrinedText">{user.userName}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4>User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoDesc">
            <div className="rightbarInfoItem">
              <h5>City :</h5>
              <span>Nepal , Butwal</span>
            </div>
            <div className="rightbarInfoItem">
              <h5>From :</h5>
              <span>Nepal , Butwal</span>
            </div>
            <div className="rightbarInfoItem">
              <h5>Gender:</h5>
              <span>Male</span>
            </div>
            <div className="rightbarInfoItem">
              <h5>Relationship :</h5>
              <span>Single</span>
            </div>
          </div>
          <h4  className="followingText">User Followings</h4>
          <div className="rightbarFollowings">
            <div className="following">
              <img  src="/assets/following/dayahang.jpg" alt="" />
              <span>Dayahang rai</span>
            </div>
            <div className="following">
              <img src="/assets/following/sajjan.jpg" alt="" />
              <span>Sajjan Raj Vaidya</span>
            </div>
            <div className="following">
              <img src="/assets/following/zegerberg.jpg"  alt="" />
              <span>Mark Jugerberg</span>
            </div>
            <div className="following">
              <img src="/assets/following/jeff.jpg"  alt="" />
              <span>Jeff Bejos rai</span>
            </div>
            <div className="following">
              <img src="/assets/following/jay.jpg"  alt="" />
              <span>Jay Shetty</span>
            </div>
            <div className="following">
              <img src="/assets/following/bipin.jpg"  alt="" />
              <span>Bipin Karki</span>
            </div>
         
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        { profile ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  );
}
