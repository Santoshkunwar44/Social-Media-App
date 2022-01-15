const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const app = express();
//   REQUIRING THE ROUTES
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/post");


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

//CREATING A ROUTE
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.listen(8800, () => console.log("Server is active ..."));
