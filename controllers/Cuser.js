const db = require("../models");

exports.getMyInfo = async (req, res) => {
  try {
    const { user_idx } = req.session.user;
    const user = await db.User.findByPk(user_idx);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user_idx--->>>", user_idx);
    res.status(200).json(user_idx);
  } catch (error) {
    console.error("Error getMyInfo", error);
    res.status(500).json({ message: "Error getMyInfo" });
  }
};
exports.getUserProfileWithPosts = async (req, res) => {
  try {
    const { user_idx } = req.params; // 조회할 유저의 user_idx를 경로 파라미터에서 가져옴
    const { page = 1, take = 12 } = req.query; // 기본값으로 page=1, take=12 설정
    const offset = (page - 1) * take;
    const limit = parseInt(take);
    const loggedInUserIdx = req.session.user.user_idx; // 현재 로그인한 유저의 user_idx
    const userRole = req.session.user.role;

    // 사용자 정보 조회
    console.log("userRole--->>>", userRole);
    const user = await db.User.findOne({
      where: { user_idx },
      attributes: ["nickname", "img", "introduce", "provider"],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 전체 게시글 수 조회
    const totalCount = await db.Post.count({ where: { user_idx } });
    // 페이지네이션을 위한 offset과 limit 계산
    const posts = await db.Post.findAll({
      where: { user_idx },
      attributes: ["post_idx", "thumbnailUrl", "gym_idx"],
      offset: offset,
      limit: limit,
      order: [["createdAt", "DESC"]], // 최신 게시글 먼저 조회
    });

    const isOwnProfile = loggedInUserIdx === parseInt(user_idx); // 본인의 프로필인지
    const result = {
      user,
      posts,
      meta: {
        page: parseInt(page),
        take: limit,
        totalCount: totalCount,
        pageCount: Math.ceil(totalCount / limit),
        hasPreviousPage: page > 1,
        hasNextPage: offset + posts.length < totalCount,
      },
      isOwnProfile,
    };
    // 본인의 프로필인 경우에만 role 추가
    if (isOwnProfile) {
      result.userRole = userRole;
    }
    // 사용자 정보와 게시글을 함께 반환
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching user profile and posts", error);
    res.status(500).json({ message: "Error fetching user profile and posts" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { user_idx } = req.session.user;
    const { nickname, img, introduce } = req.body;
    const user = await db.User.findByPk(user_idx);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedFields = {};
    if (nickname !== undefined) updatedFields.nickname = nickname;
    if (img !== undefined) updatedFields.img = img;
    if (introduce !== undefined) updatedFields.introduce = introduce;
    await user.update(updatedFields);
    res.status(200).json(user);
  } catch (error) {
    console.log("Error updating user profile", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
};

exports.checkNickname = async (req, res) => {
  try {
    const { nickname } = req.params;
    const user = await db.User.findOne({
      where: { nickname },
    });
    if (user) {
      return res
        .status(409)
        .json({ available: false, message: "Nickname is already taken" });
    }
    res.status(200).json({ available: true, message: "Nickname is available" });
  } catch (error) {
    console.error("Error checking nickname availability", error);
    res.status(500).json({ message: "Error checking nickname availability" });
  }
};
