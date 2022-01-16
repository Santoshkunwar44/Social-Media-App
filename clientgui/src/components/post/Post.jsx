import React, { useState } from "react";
import {
  MoreVert,
  FavoriteBorder,
  Bookmarks,
  Bookmark,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import "./post.css";
import { users } from "../../dummydata";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";
export default function Post({ postImg, like, date, userId }) {
  const [likes, setLike] = useState(like);
  const [isLiked, setisLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? likes - 1 : likes + 1);
    setisLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="topRight">
            <img
              className="profilePictureImg"
              src={users.filter((user) => user.id === userId)[0].profilePicture}
              alt="profilePicture"
            />
            <span className="topName">
              {users.filter((user) => user.id === userId)[0].userName}
            </span>
            <span className="topDate">{date}</span>
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
              <ThumbUpAltOutlined onClick={likeHandler} className="likeIcon" />
              <FavoriteBorder
                onClick={likeHandler}
                className="likeIcon"
                htmlColor="red"
              />
            </div>

            <span className="LikedText">{likes} people liked it </span>
          </div>
          <div htmlColor="red" className="bottomRight">
            <Bookmarks className="bookmarkIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}
