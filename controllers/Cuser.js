const db = require("../models");

exports.getUserProfileWithPosts = async (req, res) => {
  try {
    const { user_idx } = req.params;
    // 사용자 정보 조회
    const user = await db.User.findOne({
      where: { user_idx },
      attributes: ["nickname", "img"],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // 사용자 게시글 조회
    const posts = await db.Post.findAll({
      where: { user_idx },
    });
    // 사용자 정보와 게시글을 함께 반환
    res.status(200).json({
      user,
      posts,
    });
  } catch (error) {
    console.error("Error fetching user profile and posts", error);
    res.status(500).json({ message: "Error fetching user profile and posts" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { user_idx } = req.params;
    const { nickname, img } = req.body;
    const user = await db.User.findByPk(user_idx);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedFields = {};
    if (nickname !== undefined) updatedFields.nickname = nickname;
    if (img !== undefined) updatedFields.img = img;
    await user.update(updatedFields);
    res.status(200).json(user);
  } catch (error) {
    console.log("Error updating user profile", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
};
