const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");

const Cgym = require("../controllers/Cgym");
const Cpost = require("../controllers/Cpost");
const Cuser = require("../controllers/Cuser");

router.use("/auth", authRoutes);

// 클라이밍장 CRUD
/** 클라이밍장 리스트 조회
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
/** 새로운 클라이밍장 생성
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
/** 클라이밍장 정보 수정
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
/** 클라이밍장 삭제
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

// 게시글 CRUD
/** 게시글 생성
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
/** 특정 클라이밍장 게시글 조회
 * @swagger
 * /api/posts/gym/{gym_idx}:
 *   get:
 *     summary: 특정 클라이밍장 게시글 조회
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: gym_idx
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 클라이밍장 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: 서버 오류
 */
router.get("/posts/gym/:gym_idx", Cpost.getPostsByGym);
/** 게시글 수정
 * @swagger
 * /api/posts/{post_idx}:
 *   patch:
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
router.patch("/posts/:post_idx", Cpost.updatePost);
/** 게시글 삭제
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
/** 특정 게시글 상세 조회
 * @swagger
 * /api/posts/{post_idx}:
 *   get:
 *     summary: 특정 게시글 상세 조회
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: post_idx
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회하려는 게시글의 ID
 *     responses:
 *       200:
 *         description: 게시글 상세 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post_idx:
 *                   type: integer
 *                 user_idx:
 *                   type: integer
 *                 gym_idx:
 *                   type: integer
 *                 clearday:
 *                   type: string
 *                   format: date
 *                 media:
 *                   type: string
 *                 content:
 *                   type: string
 *                 color:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 User:
 *                   type: object
 *                   properties:
 *                     nickname:
 *                       type: string
 *                     img:
 *                       type: string
 *       404:
 *         description: 게시글을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.get("/posts/:post_idx", Cpost.getPostDetails);

// 유저 관련
/** 유저 프로필 및 게시글 조회
 * @swagger
 * /api/user/profile/{user_idx}:
 *   get:
 *     summary: 유저 프로필 및 게시글 조회
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: user_idx
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 유저 프로필 및 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     nickname:
 *                       type: string
 *                     img:
 *                       type: string
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: 유저를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.get("/profile/:user_idx", Cuser.getUserProfileWithPosts);
/** 유저 프로필 수정
 * @swagger
 * /api/user/profile/{user_idx}:
 *   patch:
 *     summary: 유저 프로필 수정
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: user_idx
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
 *               nickname:
 *                 type: string
 *               img:
 *                 type: string
 *     responses:
 *       200:
 *         description: 유저 프로필 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: 유저를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.patch("/profile/:user_idx", Cuser.updateUserProfile);
/** 닉네임 중복 체크
 * @swagger
 * /api/check-nickname/{nickname}:
 *   get:
 *     summary: 닉네임 중복 체크
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: nickname
 *         required: true
 *         schema:
 *           type: string
 *         description: 체크하려는 닉네임
 *     responses:
 *       200:
 *         description: 닉네임 사용 가능
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       409:
 *         description: 닉네임 중복
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: 서버 오류
 */
router.get("/check-nickname/:nickname", Cuser.checkNickname);

module.exports = router;
