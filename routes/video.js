const express = require("express");
const { uploadVideo } = require("../middlewares/upload");
const Cvideo = require("../controllers/Cvideo");
const router = express.Router();

/** 동영상 업로드
 * @swagger
 * /api/videos:
 *   post:
 *     summary: 동영상 업로드
 *     tags: [Videos]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 동영상 파일
 *                 required: true
 *     responses:
 *       200:
 *         description: 동영상 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 videoUrl:
 *                   type: string
 *                 thumbnailUrl:
 *                   type: string
 *       400:
 *         description: 파일이 업로드되지 않음
 *       500:
 *         description: 서버 오류
 */
router.post("/videos", uploadVideo.single("video"), Cvideo.uploadVideo);

module.exports = router;
