const { where } = require("sequelize");
const db = require("../models");

// 클라이밍장 조회
exports.getGyms = async (req, res) => {
  try {
    const { page = 1, take = 15, search = "" } = req.query; // 기본값으로 page=1, take=10 설정
    const offset = (page - 1) * take;
    const limit = parseInt(take);

    // 검색 조건 추가
    const whereCondition = search
      ? {
          name: {
            [db.Sequelize.Op.like]: `%${search}%`,
          },
        }
      : {};

    // 전체 클라이밍장 수 조회
    const totalCount = await db.Gym.count({ where: whereCondition });
    // 페이지네이션을 위해 클라이밍장 조회
    const gyms = await db.Gym.findAll({
      where: whereCondition,
      offset: offset,
      limit: limit,
      order: [["gym_idx", "ASC"]], // gym_idx를 기준으로 내림차순 정렬
    });

    const result = {
      gyms: gyms,
      meta: {
        page: parseInt(page),
        take: limit,
        totalCount: totalCount,
        pageCount: Math.ceil(totalCount / limit),
        hasPreviousPage: page > 1,
        hasNextPage: offset + gyms.length < totalCount,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching gyms:", error);
    res.status(500).send("Error fetching gyms");
  }
};

//클라이밍장 상세 조회
exports.getGymsDetails = async (req, res) => {
  try {
    const { gym_idx } = req.params;
    const gym = await db.Gym.findOne({
      where: { gym_idx },
    });
    if (!gym) {
      return res.status(404).json({ message: "gymDetails not found" });
    }
    res.status(200).json(gym);
  } catch (error) {
    console.error("Error fetching gym details:", error);
    res.status(500).json({ message: "Error fetching gym details" });
  }
};

// 클라이밍장 추가
exports.createGym = async (req, res) => {
  const { name, address, logo, notice } = req.body;
  try {
    const newGym = await db.Gym.create({
      name,
      address,
      logo,
      notice,
    });
    res.status(201).json(newGym);
  } catch (error) {
    console.error("Error creating gym:", error);
    res.status(500).send("Error creating gym");
  }
};

// 클라이밍장 정보 수정
exports.updateGym = async (req, res) => {
  const { gym_idx } = req.params;
  const { name, address, logo, notice } = req.body;
  try {
    const gym = await db.Gym.findByPk(gym_idx);
    if (!gym) {
      return res.status(404).send("Gym not found");
    }
    // 변경된 필드만 업데이트
    if (name !== undefined) gym.name = name;
    if (address !== undefined) gym.address = address;
    if (logo !== undefined) gym.logo = logo;
    if (notice !== undefined) gym.notice = notice;

    await gym.save();
    res.json(gym);
  } catch (error) {
    console.error("Error updating gym:", error);
    res.status(500).send("Error updating gym");
  }
};

// 클라이밍장 삭제
exports.deleteGym = async (req, res) => {
  const { gym_idx } = req.params;
  try {
    const gym = await db.Gym.findByPk(gym_idx);
    if (!gym) {
      return res.status(404).send("Gym not found");
    }

    await gym.destroy();
    res.status(200).json({ message: "삭제 완료" });
  } catch (error) {
    console.error("Error deleting gym:", error);
    res.status(500).send("Error deleting gym");
  }
};
