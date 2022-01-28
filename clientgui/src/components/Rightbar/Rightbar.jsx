import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import { users } from "../../dummydata";
import OnlineFriends from "../Onlinefriends/OnlineFriends";
import axiosCall from "../../axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Authcontext";
export default function Rightbar({ myusers }) {


  const [friends, setFriends] = useState([]);
  const {user:currentUser} = useContext(AuthContext)

  // const [followed, setFollowed] = useState(
  //   user.followings.includes(myusers?.id)

  // );

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // fetching the friends of the myusers

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axiosCall.get("/users/friends/" + myusers._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [myusers]);



  const handleFollow = async () => {
    // try {
    //   followed
    //     ? await axiosCall.put(`/users/${myusers._id}/unfollow`, {
    //       userId: currentUser._id,
    //     })
    //     : await axiosCall.put(`/users/${myusers._id}/follow`, {
    //       userId: currentUser._id,
    //     });
    //   setFollowed(!followed);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainr">
          <img
            className="birthdayImg"
            src="https://img.icons8.com/cotton/64/000000/birthday.png"
            alt=""
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
            {users.map((user, index) => (
              <OnlineFriends key={index} user={user} />
            ))}
          </ul>
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {/* {myusers.username !== currentUser.username && (
          <div className="followdiv">
            <button onClick={handleFollow} className="followBtn">
              {followed ? "Unfollow" : "Follow"}
            </button>
          </div>
        )} */}
        <h4>User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoDesc">
            <div className="rightbarInfoItem">
              <h5>City :</h5>
              <span>{myusers.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <h5>From :</h5>
              <span>{myusers.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <h5>Gender:</h5>
              <span>{myusers.gender}</span>
            </div>
            <div className="rightbarInfoItem">
              <h5>Relationship :</h5>
              <span>{myusers.relationship}</span>
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
                <Link to={"/profile/" + friend.username}>
                  {" "}
                  <span>{friend.username}</span>{" "}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {myusers ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
