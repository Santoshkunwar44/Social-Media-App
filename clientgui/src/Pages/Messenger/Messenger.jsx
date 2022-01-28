import React, { useContext, useEffect, useRef, useState } from "react";
import "./messenger.css";
import Topbar from "../../components/Topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import { Send } from "@material-ui/icons";
import Onlinefriend from "../../components/onlinefrend/Onlinefriend";
import { AuthContext } from "../../Context/Authcontext";
import axiosCall from "../../axios";
import { io } from "socket.io-client"

export default function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversation, setConversation] = useState([]);
  const [onlineFriends, setonlineFriends] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();
  const [message, setMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setnewMessage] = useState("");
  const scrollRef = useRef();


  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("receive", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);


  // 
  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessage(prev => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])



  useEffect(() => {
    socket.current.emit("adduser", (user._id))
    socket.current.on("getuser", users => {

      setonlineFriends(user.followings.filter((f) => users.some((online) => online.userId === f)))
    })
  }, [user])


  useEffect(() => {
    const getConversation = async () => {
      try {
        const conversation = await axiosCall.get("/conversation/" + user._id);
        setConversation(conversation.data);
      } catch (err) {
        console.log(err);
      }
    };

    getConversation();
  }, [user._id]);

  // GET MESSAGE
  useEffect(() => {
    const getMessage = async () => {
      try {
        const message = await axiosCall.get("/message/" + currentChat._id);
        setMessage(message.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMessage();
  }, [currentChat]);


  useEffect(() => {

    scrollRef.current?.scrollIntoView({ behavior: "smooth" })

  }, [message])



  const handleSubmit = async () => {
    const set_message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    }


    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });


    try {
      const res = await axiosCall.post("/message/", set_message);
      setMessage([...message, res.data]);
      setnewMessage("")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Topbar />
      <div className="messenger own">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              className="menuInput"
              placeholder="Search for friends"
            />
            <hr />
            {conversation.map((c, index) => (
              <div
                onClick={() => setCurrentChat(c)}
                key={index}
                className="conversationWrapper"
              >
                <Conversation Conversation={c} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="boxtop">
                  {message.map((e, index) => {
                    return <>   <div ref={scrollRef}>  <Message
                      key={index}
                      message={e}
                      own={e.sender === user._id}
                    />        </div></>;
                  })}
                </div>
                <div className="chatBoxBottom">
                  <input
                    name="chatArea"
                    id=""
                    cols="30"
                    onChange={(e) => setnewMessage(e.target.value)}
                    value={newMessage}
                    rows="10"
                    className="chatArea"
                    placeholder="friends are waiting for your message !!!"
                  ></input>
                  <Send
                    style={{ fontSize: "44px", cursor: "pointer" }}
                    className="sendBtn"
                    onClick={handleSubmit}
                  />
                </div>
              </>
            ) : (
              <span className="openChatSpan">
                Open a Conversation to start a chat{" "}
              </span>
            )}
          </div>
        </div>
        <div className="onlineFriends">
          <div className="onlineFriendsWrapper">
            <h4 className="onlineFriendText">
              Online Friends <span className="onlineCount">99+</span>
            </h4>
            {
              onlineFriends.map((online) => {
                return <Onlinefriend key={online._id} onlinefriend={online} currentUser={user._id} setCurrentChat={setCurrentChat} />
              })
            }


          </div>
        </div>
      </div>
    </>
  );
}
