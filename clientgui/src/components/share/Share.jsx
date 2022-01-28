import "./share.css";
import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@material-ui/icons";
import { AuthContext } from "../../Context/Authcontext";
import { useContext, useRef, useState } from "react";
import axiosCall from "../../axios";
export default function Share() {
  const { user } = useContext(AuthContext);

  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // if (file) {
    //   const data = new FormData();
    //   const fileName = Date.now() + file.name;
    //   data.append("file", file);
    //   data.append("name", fileName);
    //   newPost.image = fileName;
    //   console.log(newPost);
    //   try {
    //     await axiosCall.post("/upload", data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      try {
        await axiosCall.post("/upload", data);
      } catch (err) {}
    }

    try {
      await axiosCall.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <form onSubmit={handleSubmit}>
          <div className="shareTop">
            <img
              src="/assets/1.jpg"
              alt="profilePicture"
              className="ProfilePictureImg"
            />
            <input
              ref={desc}
              className="shareTopInput"
              placeholder={"What's in your mind " + user.username + "?"}
            />
          </div>
          {file && (
            <div className="imageContainer">
              <img
                className="postImg"
                src={URL.createObjectURL(file)}
                alt="postImage"
              />
              <Cancel onClick={()=>setFile(null)} className="cancelPost" />
            </div>
          )}
          <hr className="sharehr" />

          <div className="shareButtom">
            <div className="shareoptions">
              <label htmlFor="file" className="shareoption">
                <PermMedia htmlColor="tomato" />
                <span className="shareOptiontext">Photo or video</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div className="shareoption">
                <Label htmlColor="green" />
                <span className="shareOptiontext">Tag</span>
              </div>
              <div className="shareoption">
                <Room htmlColor="blue" />
                <span className="shareOptiontext">Location</span>
              </div>
              <div className="shareoption">
                <EmojiEmotions htmlColor="goldenrod" />
                <span className="shareOptiontext">Feeling</span>
              </div>
              <button type="submit" className="sharebutton">
                Share
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
