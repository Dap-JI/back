const express = require("express");
const { kakaoLogin, kakaoCallback } = require("../controllers/Cauth");
const router = express.Router();
/**
 * @swagger
 * /api/auth/kakao:
 *   get:
 *     summary: 카카오 로그인
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: 카카오 로그인 페이지로 리디렉션
 */
router.get("/kakao", kakaoLogin);

/**
 * @swagger
 * /api/auth/kakao/callback:
 *   get:
 *     summary: 카카오 로그인 콜백
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: 카카오에서 받은 인증 코드
 *     responses:
 *       200:
 *         description: 사용자 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nickname:
 *                   type: string
 *                 email:
 *                   type: string
 *                 img:
 *                   type: string
 *       500:
 *         description: 서버 오류
 */
router.get("/kakao/callback", kakaoCallback);

module.exports = router;
