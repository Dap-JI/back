const express = require("express");
const upload = require("../middlewares/upload");
const Cimage = require("../controllers/Cimage");

const router = express.Router();

/**
 * @swagger
 * /api/images:
 *   post:
 *     summary: 이미지 업로드
 *     tags: [Images]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The image to upload
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
 *         description: No file uploaded
 *       500:
 *         description: 서버 오류
 */

router.post("/images", upload.single("image"), Cimage.uploadImage);

module.exports = router;
