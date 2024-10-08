const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3001;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      if (/^http:\/\/localhost:\d+$/.test(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

const mongoURL =
  "mongodb+srv://khessarin:4zY0GVP699nSH0zf@admin.uf1d0.mongodb.net/";
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
const notificationsRouter = require("./routes/notifications"); // Add this line

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/posts", postRouter);
app.use("/forgot-password", ForgotPassword);
app.use("/follow", FollowUser);
app.use("/admin", AdminProfile);
app.use("/admin/register", AdminRegister);
app.use("/notifications", notificationsRouter); // Add this line

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
