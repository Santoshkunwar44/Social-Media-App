import React, { useContext, useEffect, useState } from "react";
import axiosCall from "../../axios";
import { AuthContext } from "../../Context/Authcontext";
import "./conversation.css";
export default function Conversation({ Conversation }) {
  const [user, setUser] = useState([]);
  const { user: currentuser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const userId = Conversation.members.find((m) => m !== currentuser._id);

    const getUser = async () => {
      const res = await axiosCall.get("/users?userId=" + userId);
      setUser(res.data);
    };

    getUser();
  }, [currentuser, Conversation]);
  return (
    <div className="c_wrapper">
      <img
        className="c_img"
        src={
          user?.profilePicture ? PF + user?.profilePicture : "assets/nouser.jpg"
        }
        alt=""
      />
      <span className="c_name">{user.username}</span>
    </div>
  );
}
