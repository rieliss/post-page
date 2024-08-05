const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const { you: youId, me: meId } = req.body;

    const you = await User.findById(youId);
    const me = await User.findById(meId);

    // Check if both users are found
    if (!you || !me) {
      return res.status(404).json({ message: "User not found" });
    }

    let isUpdated = false;

    // Check if `me` is already in `you`'s followers to avoid duplicates
    if (!you.followers.some((followerId) => followerId.equals(me._id))) {
      you.followers.push(me._id); // Push `me`'s ID into `you`'s followers array
      isUpdated = true;
    }

    if (!me.following.some((followingId) => followingId.equals(you._id))) {
      me.following.push(you._id); // Push `you`'s ID into `me`'s following array
      isUpdated = true;
    }

    if (isUpdated) {
      await you.save(); // Save the updated `you` document to the database
      await me.save(); // Save the updated `me` document to the database
    }

    // Create a new object with the `if_followed` property
    const checkFollowers = you.followers.some((followerId) =>
      followerId.equals(me._id)
    );

    const newFollow = { ...you.toObject(), if_followed: checkFollowers };

    // Respond with success message
    res.status(200).json({ message: "Successfully added follower", newFollow });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating user data" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const userData = req.body;
    const you = await User.findById(userData.you);
    const me = await User.findById(userData.me);

    // Check if both users are found
    if (!you || !me) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove `me` from `you`'s followers
    you.followers.pull(me._id);

    await you.save(); // Save the updated `you` document to the database

    res.json({ message: "Successfully removed follower" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting follower: " + error.message });
  }
});

module.exports = router;
