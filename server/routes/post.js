const express = require("express");
const router = express.Router();
const verifyToken = require("./../middleware/auth");

const Post = require("./../models/Post");

/**
 * @route POST api/posts
 * @description create post
 * @access Private
 */

router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  //simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "happy learning", post: newPost });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});

/**
 * @route GET api/posts
 * @description GET posts
 * @access Private
 */

router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});

/**
 * @route PUT api/posts
 * @description Update posts
 * @access Private
 */

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  try {
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );
    // User not authorised to update post
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or User not authorised",
      });
    }
    res.json({
      success: true,
      message: "Excellent progress!!!",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});

/**
 * @route PUT api/posts
 * @description Update posts
 * @access Private
 */

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);
    // User not authorised to update post
    if (!deletedPost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or User not authorised",
      });
    }
    res.json({
      success: true,
      message: "DELETED",
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});

module.exports = router;
