import { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axiosCall from "../../axios";
export default function Feed({ username }) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = username
        ? await axiosCall.get("/posts/profile/" + username)
        : await axiosCall.get("/posts/timeline/61e285193845c0e7c641eaf0");
      const data = response.data;

      const isArray = Array.isArray(data);

      if (!isArray) {
        let arrPost = [];
        arrPost.push(data);
        return setPost(arrPost);
      }
      setPost(response.data);

    };

    fetchUser();
  }, [username]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {post
          ? post.map((post, index) => (
              <Post
                key={index}
                postImg={post.image}
                // like={post.likes}
                date={post.createdAt}
                comment={post.comment}
                userId={post.userId}
              />
            ))
          : null}
      </div>
    </div>
  );
}
