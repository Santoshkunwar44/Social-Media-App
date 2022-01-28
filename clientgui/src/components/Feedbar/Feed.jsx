import { useState, useEffect, useContext } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axiosCall from "../../axios";
import { AuthContext } from "../../Context/Authcontext";
export default function Feed({ username }) {
  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const response = username
        ? await axiosCall.get("/posts/profile/" + username)
        : await axiosCall.get("/posts/timeline/" + user._id);
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
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {username ? user.username === username && <Share /> : <Share />}

        {post
          ? post.map((post, index) => (
              <Post
                desc={post.desc}
                key={index}
                postId={post._id}
                postImg={post.image}
                like={post.likes}
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
