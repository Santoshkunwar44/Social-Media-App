import Post from "../post/Post";
import Share from "../share/Share";
import { post, users } from "../../dummydata";
import "./feed.css";
export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {post.map((post) => (
          <Post
            key={post.id}
            postImg={post.postImg}
            like={post.like}
            date={post.date}
            comment={post.comment}
            userId={post.userId}
          />
        ))}
      </div>
    </div>
  );
}
