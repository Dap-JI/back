const express = require("express");
const {
  uploadGymLogo,
  uploadProfilePicture,
  uploadBoardImage,
} = require("../middlewares/upload");
const Cimage = require("../controllers/Cimage");

const router = express.Router();

/**
 * @swagger
 * /api/images/gym-logo:
 *   post:
 *     summary: 클라이밍장 로고 이미지 업로드
 *     tags: [Images]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: 업로드할 로고 이미지
 *         required: true
 *     responses:
 *       200:
 *         description: 이미지 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *       400:
 *         description: 파일이 업로드되지 않음
 *       500:
 *         description: 서버 오류
 */
router.post(
  "/images/gym-logo",
  uploadGymLogo.single("image"),
  Cimage.uploadImage
);

/**
 * @swagger
 * /api/images/profile-picture:
 *   post:
 *     summary: 프로필 사진 업로드
 *     tags: [Images]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: 업로드할 프로필 사진
 *         required: true
 *     responses:
 *       200:
 *         description: 이미지 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *       400:
 *         description: 파일이 업로드되지 않음
 *       500:
 *         description: 서버 오류
 */
router.post(
  "/images/profile-picture",
  uploadProfilePicture.single("image"),
  Cimage.uploadImage
);

/**
 * @swagger
 * /api/images/board-image:
 *   post:
 *     summary: 자유게시판 이미지 업로드
 *     tags: [Images]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: 업로드할 게시판 이미지
 *         required: true
 *     responses:
 *       200:
 *         description: 이미지 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *       400:
 *         description: 파일이 업로드되지 않음
 *       500:
 *         description: 서버 오류
 */
router.post(
  "/images/board-image",
  uploadBoardImage.single("image"),
  Cimage.uploadImage
);

module.exports = router;
