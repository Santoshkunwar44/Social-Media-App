import React from 'react'

import "../Rightbar/rightbar.css"
export default function OnlineFriends({user}) {
    return (
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
    )
}
