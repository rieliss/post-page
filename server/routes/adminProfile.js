const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");

//Admin
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find({}).lean();
    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching user data" });
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const admin = await Admin.findById(req.params.id).lean();
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching user data" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email, password });

    if (admin) {
      res.json({ success: true, id: admin._id, message: "Login successful!" });
    } else {
      res.json({ success: false, message: "Invalid email or password." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});
module.exports = router;
