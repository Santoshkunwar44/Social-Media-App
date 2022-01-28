const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//initializing an array of all the Online users to store  their socketId & userId

let onlineUsers = [];

// ADDING THE USER'S USERID AND THE SOCKETID IN THE ONLINEUSER ARRAY EVERY TIME ONE (--NEW--) CLIENT JOINS

const addUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

// REMOVING THE USER'S USERID AND SOCKETID FROM THE ONLINEUSERS ARRAY WHEN THE USER DISCONNECTED FROM THE BROWSER

const removeUser = (socketId) => {
  onlineUsers.filter((user) => user.socketId !== socketId);
};

//get user functions to send the message

const getUser = (userId) => {
  const user = onlineUsers.find((user) => user.userId === userId);
  return user;
};
io.on("connection", (socket) => {
  console.log(onlineUsers)
  socket.on("adduser", (userId) => {
    addUser(userId, socket.id);
    console.log("userconnected ", onlineUsers);
    io.emit("getuser", onlineUsers);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log(onlineUsers)
    console.log("got message", senderId, text, receiverId);
    const user = getUser(receiverId);
    io.to(user.socketId).emit("receive", { senderId, text });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("disconnected ", onlineUsers);
    io.emit("getuser", onlineUsers);
  });
});
