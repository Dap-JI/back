const db = require("../models");

// 클라이밍장 조회
exports.getGyms = async (req, res) => {
  try {
    const gyms = await db.Gym.findAll();
    res.json(gyms);
  } catch (error) {
    console.error("Error fetching gyms:", error);
    res.status(500).send("Error fetching gyms");
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
