const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const Like = require("../models/like");
const Notification = require("../models/notification");

router.get("/search", async (req, res) => {
  const query = req.query.query;
  if (!query || typeof query !== "string") {
    return res
      .status(400)
      .json({ message: "Query parameter is missing or not a string" });
  }

  try {
    const posts = await Post.find({
      $or: [
        { topic: new RegExp(query, "i") },
        { category: new RegExp(query, "i") },
        { content: new RegExp(query, "i") },
      ],
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add new blog post
router.post("/", async (req, res) => {
  const { user, topic, category, image, content } = req.body;

  if (!user || !topic || !category || !image || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const post = new Post({ user, topic, category, image, content });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post: " + error.message });
  }
});

// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .populate("likes");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts: " + error.message });
  }
});

// Get blog post by ID
router.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

// Update blog post
router.patch("/:id", getPost, async (req, res) => {
  const { topic, category, image, content } = req.body;

  if (topic != null) res.post.topic = topic;
  if (category != null) res.post.category = category;
  if (image != null) res.post.image = image;
  if (content != null) res.post.content = content;

  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating post: " + error.message });
  }
});

// Delete blog post
router.delete("/:id", getPost, async (req, res) => {
  try {
    await Comment.deleteMany({ post: res.post._id });
    await Like.deleteMany({ post: res.post._id });

    await Post.deleteOne({ _id: res.post._id });
    res.json({ message: "Deleted Post" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post: " + error.message });
  }
});

// Middleware for fetching post by ID
async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id)
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "User",
        },
      })
      .populate("likes");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error finding post: " + error.message });
  }
  res.post = post;
  next();
}

router.post("/:id/likes", async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
      return res.status(404).json({ message: "Post or User not found" });
    }

    const existingLike = await Like.findOne({ post: postId, user: userId });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      post.likes = post.likes.filter(
        (likeId) => !likeId.equals(existingLike._id)
      );
      await post.save();

      await Notification.deleteOne({
        user: post.user,
        entity: postId,
        type: "like",
        entityModel: "Post",
      });

      res.status(200).json({ message: "Post disliked", post });
    } else {
      const like = new Like({ user: userId, post: postId });
      await like.save();

      post.likes.push(like._id);
      await post.save();

      const existingNotification = await Notification.findOne({
        user: post.user,
        entity: postId,
        type: "like",
        entityModel: "Post",
      });

      if (!existingNotification) {
        const notification = new Notification({
          user: post.user,
          type: "like",
          message: `${user.firstname} ${user.lastname || ""} liked your post.`,
          entity: post._id,
          entityModel: "Post",
        });
        await notification.save();
      }

      res.status(200).json({ message: "Post liked", post, like: like._id });
    }
  } catch (error) {
    console.error("Error liking/disliking post:", error);
    res
      .status(500)
      .json({ message: "Error liking/disliking post: " + error.message });
  }
});

// Add comment
router.post("/:id/comment", async (req, res) => {
  const postId = req.params.id;
  const { content, author } = req.body;

  try {
    const post = await Post.findById(postId).populate("user");
    const user = await User.findById(author);

    if (!post || !user) {
      return res.status(404).json({ message: "Post or User not found" });
    }

    const comment = new Comment({ content, author, post: postId });
    await comment.save();

    post.comments.push(comment._id);
    await post.save();

    const existingNotification = await Notification.findOne({
      user: post.user._id,
      entity: postId,
      type: "comment",
      entityModel: "Post",
    });

    if (!existingNotification) {
      const notification = new Notification({
        user: post.user._id,
        type: "comment",
        message: `${user.firstname} ${
          user.lastname || ""
        } commented on your post.`,
        entity: postId,
        entityModel: "Post",
      });
      await notification.save();
    }

    res.status(201).json({
      message: "Comment created successfully",
      post,
      comment: comment._id,
    });
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Error creating comment: " + err.message });
  }
});

module.exports = router;
