const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

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

// เพิ่มโพสต์บล็อกใหม่
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

// ดึงข้อมูลโพสต์บล็อกทั้งหมด
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

// ดึงข้อมูลโพสต์บล็อกตาม ID
router.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

// แก้ไขข้อมูลโพสต์บล็อก
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

// ลบข้อมูลโพสต์บล็อก
router.delete("/:id", getPost, async (req, res) => {
  try {
    // ลบคอมเมนต์และไลค์ที่เกี่ยวข้อง
    await Comment.deleteMany({ post: res.post._id });
    await Like.deleteMany({ post: res.post._id });

    await Post.deleteOne({ _id: res.post._id });
    res.json({ message: "Deleted Post" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post: " + error.message });
  }
});

// Middleware สำหรับการดึงโพสต์ตาม ID
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

// เพิ่มหรือลบไลค์
router.post("/:id/likes", async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  console.log("postId", postId);
  console.log("userId", userId);

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      post.likes.pull(existingLike._id);
      await post.save();
      return res.status(200).json({ message: "Like removed successfully" });
    }

    const like = new Like({ user: userId, post: postId });
    const savedLike = await like.save();
    post.likes.push(savedLike._id);
    await post.save();
    res
      .status(201)
      .json({ message: "Like created successfully", like: savedLike });
  } catch (err) {
    res.status(500).json({ message: "Error handling like: " + err.message });
  }
});

// เพิ่มคอมเมนต์
router.post("/:id/comment", async (req, res) => {
  const postId = req.params.id;
  const { content, author } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({ content, author, post: postId });
    const savedComment = await comment.save();
    post.comments.push(savedComment._id);
    await post.save();

    res
      .status(201)
      .json({ message: "Comment created successfully", comment: savedComment });
  } catch (err) {
    res.status(500).json({ message: "Error creating comment: " + err.message });
  }
});

module.exports = router;
