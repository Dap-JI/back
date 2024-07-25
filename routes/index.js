const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");

const Cgym = require("../controllers/Cgym");

router.use("/auth", authRoutes);

/**
 * @swagger
 * /api/gyms:
 *   get:
 *     summary: 클라이밍장 리스트 조회
 *     tags: [Gym]
 *     responses:
 *       200:
 *         description: 클라이밍장 리스트
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   gym_idx:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   logo:
 *                     type: string
 *                   notice:
 *                     type: string
 *       500:
 *         description: 서버 오류
 */
router.get("/gyms", Cgym.getGyms);

/**
 * @swagger
 * /api/gyms:
 *   post:
 *     summary: 새로운 클라이밍장 생성
 *     tags: [Gym]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               logo:
 *                 type: string
 *               notice:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gym 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gym_idx:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 logo:
 *                   type: string
 *                 notice:
 *                   type: string
 *       500:
 *         description: 서버 오류
 */
router.post("/gyms", Cgym.createGym);

module.exports = router;
