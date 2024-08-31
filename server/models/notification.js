const mongoose = require("mongoose");
require("../models/user");
require("../models/post");
require("../models/comment");

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "comment", "follow", "other"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  entity: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "entityModel",
    required: true,
  },
  entityModel: {
    type: String,
    enum: ["Post", "Comment", "User"],
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
