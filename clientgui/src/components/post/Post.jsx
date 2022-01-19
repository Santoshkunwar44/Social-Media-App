import React, { useEffect, useState } from "react";
import {
  MoreVert,
  FavoriteBorder,
  Bookmarks,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import "./post.css";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";
import axiosCall from "../../axios";
import { format } from "timeago.js";

export default function Post({ postImg, like, date, userId }) {
  //initializing the usestate hooksS
  // const [likes, setLike] = useState(like.length);
  const [isLiked, setisLiked] = useState(false);
  const [users, setUser] = useState();

  //fetching the users from the restapi
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosCall.get(`/users?userId=${userId}`);
      const data = await response.data.payload;
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  //making the like and dislike functionality

  const likeHandler = () => {
    // setLike(isLiked ? likes - 1 : likes + 1);
    // setisLiked(!isLiked);
  };

  // console.log(postImg);

  return (
    <div className="post">
      {users && (
        <div className="postWrapper">
          <div className="postTop">
            <div className="topRight">
              <img
                className="profilePictureImg"
                src={users.profilePicture || "/assets/nouser.jpg"}
                alt="profilePicture"
              />
              <span className="topName">{users.username}</span>
              <span className="topDate">{format(date)}</span>
            </div>
            <div className="topLeft">
              <MoreVert className="posttopIcon" />
            </div>
          </div>
          <div className="postMiddle">
            <span className="caption_text">Its all for something :)</span>
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
                  image={postImg}
                  alt="green iguana"
                />
              </CardActionArea>
            </Card>
          </div>
          <div className="postBottom">
            <div className="bottomLeft">
              <div className="LikedIcons">
                <ThumbUpAltOutlined
                  onClick={likeHandler}
                  className="likeIcon"
                />
                <FavoriteBorder
                  onClick={likeHandler}
                  className="likeIcon"
                  htmlcolor="red"
                />
              </div>

              <span className="LikedText"> people liked it </span>
            </div>
            <div htmlcolor="red" className="bottomRight">
              <Bookmarks className="bookmarkIcon" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
