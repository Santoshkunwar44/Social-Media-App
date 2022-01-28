const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const app = express();
const multer = require("multer");
const path = require("path");
var cors = require("cors");
//   REQUIRING THE ROUTES
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/post");
const conversationRoute = require("./Routes/conversation");
const messageRoute = require("./Routes/message");

// to serve the image

app.use("/images", express.static(path.join(__dirname, "public/images")));

//initializing the dotenv to use it
dotenv.config();

//connecting to mongoDB
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to MongoDB");
});

//  INITIALIZING A MIDDLEWARES
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors());

// providing the path to store the images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
// creating  the file upload routes

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

//CREATING A ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.listen(8800, () => console.log("Server is active ..."));
