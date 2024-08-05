const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3001;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// mongodb+srv://khessarin:<password>@cluster0.5vl7fiz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// const mongoURL = "mongodb://localhost:27017/blogging";
const mongoURL = "mongodb+srv://khessarin:1234@cluster0.5vl7fiz.mongodb.net/";
mongoose.connect(mongoURL);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const profileRouter = require("./routes/profile");
const AdminRegister = require("./routes/adminRegister");
const postRouter = require("./routes/post");
const AdminProfile = require("./routes/adminProfile");
const ForgotPassword = require("./routes/forgotPassword");
const FollowUser = require("./routes/follow");

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/posts", postRouter);
app.use("/forgot-password", ForgotPassword);
app.use("/follow", FollowUser);
app.use("/admin", AdminProfile);
app.use("/admin/register", AdminRegister);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
