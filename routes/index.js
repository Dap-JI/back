const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");

const Cgym = require("../controllers/Cgym");
const Cpost = require("../controllers/Cpost");

router.use("/auth", authRoutes);

// 클라이밍장 CRUD
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
/**
 * @swagger
 * /api/gyms/{gym_idx}:
 *   patch:
 *     summary: 클라이밍장 정보 수정
 *     tags: [Gym]
 *     parameters:
 *       - in: path
 *         name: gym_idx
 *         schema:
 *           type: integer
 *         required: true
 *         description: Gym ID
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
 *       200:
 *         description: Gym 수정 성공
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
 *       404:
 *         description: Gym을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.patch("/gyms/:gym_idx", Cgym.updateGym);
/**
 * @swagger
 * /api/gyms/{gym_idx}:
 *   delete:
 *     summary: 클라이밍장 삭제
 *     tags: [Gym]
 *     parameters:
 *       - in: path
 *         name: gym_idx
 *         schema:
 *           type: integer
 *         required: true
 *         description: Gym ID
 *     responses:
 *       204:
 *         description: Gym 삭제 성공 (No Content)
 *       404:
 *         description: Gym을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.delete("/gyms/:gym_idx", Cgym.deleteGym);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: 게시글 생성
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_idx:
 *                 type: integer
 *               gym_idx:
 *                 type: integer
 *               clearday:
 *                 type: string
 *                 format: date
 *               media:
 *                 type: string
 *               content:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: 게시글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: 서버 오류
 */
router.post("/posts", Cpost.createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: 모든 게시글 조회
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: 서버 오류
 */
router.get("/posts", Cpost.getPosts);

/**
 * @swagger
 * /api/posts/{post_idx}:
 *   get:
 *     summary: 특정 게시글 조회
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: post_idx
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: 게시글을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.get("/posts/:post_idx", Cpost.getPostById);

/**
 * @swagger
 * /api/posts/{post_idx}:
 *   put:
 *     summary: 게시글 수정
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: post_idx
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clearday:
 *                 type: string
 *                 format: date
 *               media:
 *                 type: string
 *               content:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: 게시글을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.put("/posts/:post_idx", Cpost.updatePost);

/**
 * @swagger
 * /api/posts/{post_idx}:
 *   delete:
 *     summary: 게시글 삭제
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: post_idx
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 게시글 삭제 성공
 *       404:
 *         description: 게시글을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.delete("/posts/:post_idx", Cpost.deletePost);

module.exports = router;
