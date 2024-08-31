const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");

// Fetch notifications for a user
router.get("/", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const notifications = await Notification.find({ user: userId }).sort({
      created_at: -1,
    });
    res.json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notifications: " + error.message });
  }
});

// Create a new notification
router.post("/", async (req, res) => {
  const { user, type, message, entity, entityModel } = req.body;

  if (!user || !type || !message || !entity || !entityModel) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const notification = new Notification({
      user,
      type,
      message,
      entity,
      entityModel,
    });
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating notification: " + error.message });
  }
});

module.exports = router;
