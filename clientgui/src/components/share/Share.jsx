import "./share.css";
import {EmojiEmotions, Label, PermMedia, Room} from "@material-ui/icons"
export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src="/assets/1.jpg" alt="profilePicture" className="ProfilePictureImg" />
          <input   className="shareTopInput" placeholder="Post something Santosh" />
        </div>
        <hr className="sharehr" />
        <div className="shareButtom">
          <div className="shareoptions">
            <div className="shareoption">
                <PermMedia   htmlColor="tomato"/>
              <span className="shareOptiontext">Photo or video</span>
            </div>
            <div className="shareoption">
                <Label htmlColor="green"/>
              <span className="shareOptiontext">Tag</span>
            </div>
            <div className="shareoption">
                <Room htmlColor="blue"/>
              <span className="shareOptiontext">Location</span>
            </div>
            <div className="shareoption">
                <EmojiEmotions htmlColor="goldenrod"/>
              <span className="shareOptiontext">Feeling</span>
            </div>
            <button className="sharebutton">Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}
