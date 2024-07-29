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
    const postWithUser = await db.Post.findOne({
      where: { post_idx: newPost.post_idx },
      include: [
        {
          model: db.User,
          attributes: ["nickname"],
        },
      ],
    });
    res.status(201).json(postWithUser);
  } catch (error) {
    console.error("Error creating post", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const { user_idx } = req.params;
    const posts = await db.Post.findAll({
      where: { user_idx },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by user:", error);
    res.status(500).json({ message: "Error fetching posts by user" });
  }
};

exports.getPostsByGym = async (req, res) => {
  try {
    const { gym_idx } = req.params;
    const posts = await db.Post.findAll({
      where: { gym_idx },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by gym:", error);
    res.status(500).json({ message: "Error fetching posts by gym" });
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
    const updatedFields = {};
    if (clearday !== undefined) updatedFields.clearday = clearday;
    if (media !== undefined) updatedFields.media = media;
    if (content !== undefined) updatedFields.content = content;
    if (color !== undefined) updatedFields.color = color;
    await post.update(updatedFields);
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
