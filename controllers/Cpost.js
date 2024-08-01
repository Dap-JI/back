const db = require("../models");

exports.createPost = async (req, res) => {
  try {
    const { clearday, media, content, color, gym_idx } = req.body;
    // 세션에서 user_idx 가져오기
    const user = req.session.user;
    if (!user || !user.user_idx) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user_idx = user.user_idx;
    if (!clearday || !media || !color) {
      return res
        .status(400)
        .json({ message: "등반일, 동영상, 난이도 선택은 필수입니다." });
    }
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

exports.getPostsByGym = async (req, res) => {
  try {
    const { gym_idx } = req.params;
    const { color } = req.query;
    const gym = await db.Gym.findByPk(gym_idx, {
      attributes: ["name"],
    });
    if (!gym) {
      return res.status(404).json({ message: "Gym not found" });
    }
    // 조건 객체를 생성하여 기본적으로 gym_idx로 필터링
    const whereCondition = { gym_idx };
    // color가 존재하면 조건에 추가
    if (color) {
      whereCondition.color = color;
    }
    // 조건에 따라 게시글을 조회
    const posts = await db.Post.findAll({
      where: whereCondition,
      include: [
        {
          model: db.User,
          attributes: ["nickname"],
        },
      ],
    });
    const result = {
      gym_name: gym.name,
      posts: posts,
    };
    res.status(200).json(result);
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

exports.getPostDetails = async (req, res) => {
  try {
    const { post_idx } = req.params;
    const post = await db.Post.findOne({
      where: { post_idx },
      include: [
        {
          model: db.User,
          attributes: ["nickname", "img"],
        },
      ],
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post details", error);
    res.status(500).json({ message: "Error fetching post details" });
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
