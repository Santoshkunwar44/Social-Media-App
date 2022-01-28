import React, { useEffect,useState } from 'react'
import axiosCall from '../../axios';

import "../Sidebar/sidebar.css"
export default function Friends({ user }) {
    const [friend, getFriend] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axiosCall.get(`/users?userId=${user}`);
            const data = await response.data;

         
                getFriend(data);
        };
        fetchUser();

    }, [user]);
    console.log("frineds", friend)
    return (


        <li className="sidebarFriend" >
            <img src="" alt="" className="sidebarImg" />
            <span className="sidebarFriendName">{friend?.username} </span>

        </li>
    )
}
