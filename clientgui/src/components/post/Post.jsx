import React, { useContext, useEffect, useState } from "react";
import {
  MoreVert,
  FavoriteBorder,
  Bookmarks,
  ThumbUpAltOutlined,
  Remove,
} from "@material-ui/icons";
import "./post.css";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";
import axiosCall from "../../axios";
import { format } from "timeago.js";
import { AuthContext } from "../../Context/Authcontext";

export default function Post({ postImg, like, date, desc, postId, userId }) {

  //initializing the usestate hooksS
  const [likes, setLike] = useState(like.length);
  const [isLiked, setisLiked] = useState(false);
  const [users, setUser] = useState({});
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setisLiked(like.includes(user._id));
  }, [like, user._id]);

  //fetching the users from the restapi
  useEffect(() => {
    let unmounted = false;
    const fetchUser = async () => {
      const response = await axiosCall.get(`/users?userId=${userId}`);
      const data = await response.data;

      if (!unmounted) {
        setUser(data);
      }
    };
    fetchUser();
    return () => {
      unmounted = true;
    };
  }, [userId]);
console.log(users)
  //making the like and dislike functionality

  const likeHandler = async () => {
    try {
      const response = await axiosCall.put(`/posts/${postId}/like`, {
        userId: user._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? likes - 1 : likes + 1);
    setisLiked(!isLiked);
  };

  // console.log(postImg);
  // setLike(isLiked ? likes - 1 : likes + 1);
  // setisLiked(!isLiked);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="topRight">
            <img
              className="profilePictureImg"
              src={
                users?.profilePicture
                  ? PF + users?.profilePicture
                  : "/assets/nouser.jpg"
              }
              alt=""
            />
            <span className="topName">{users.username}</span>
            <span className="topDate">{format(date)}</span>
          </div>
          <div className="topLeft">
            <MoreVert className="posttopIcon" />
          </div>
        </div>
        <div className="postMiddle">
          <span className="caption_text">{desc}</span>
          <Card>
            <CardActionArea>
              <CardMedia
                sx={{
                  // width: "100%",
                  objectFit: "contain",
                }}
                className="postImg"
                component="img"
                height="400"
                image={`${PF}${postImg}`}
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        </div>
        <div className="postBottom">
          <div className="bottomLeft">
            <div className="LikedIcons">
              <ThumbUpAltOutlined
                style={{ color: isLiked && "red" }}
                onClick={likeHandler}
                className="likeIcon"
              />
              <FavoriteBorder
                onClick={likeHandler}
                className="likeIcon"
                htmlcolor="red"
              />
            </div>

            <span className="LikedText">{likes} people liked it </span>
          </div>
          <div htmlcolor="red" className="bottomRight">
            <Bookmarks className="bookmarkIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}
