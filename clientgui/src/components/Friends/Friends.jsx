import React from 'react'
import "../Sidebar/sidebar.css"
export default function Friends({user}) {
    return (
         <li className="sidebarFriend" >
        <img src={user.profilePicture} alt="" className="sidebarImg" />
        <span className="sidebarFriendName">{user.userName} </span>

    </li>
    )
}
