const db = require("../models");

exports.createPost = async (req, res) => {
  try {
    const { user_idx, gym_idx, clearday, media, content, color } = req.body;
    const newPost = await db.Post.create({
      user_idx,
      gym_idx,
      clearday,
      media,
      content,
      color,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("error creating post", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { post_idx } = req.params;
    const post = await db.Post.findByPk(post_idx);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post: ", error);
    res.status(500).json({ message: "Error fetching post" });
  }
};
exports.updatePost = async (req, res) => {
  try {
    const { post_idx } = req.params;
    const { clearday, media, content, color } = req.body;
    const post = await db.Post.findByPk(post_idx);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.update({ clearday, media, content, color });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error updating post", error);
    res.status(500).json({ message: "Error updating post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { post_idx } = req.params;
    const post = await db.Post.findByPk(post_idx);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.destroy();
    res.status(204).json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Error deleting post" });
  }
};
