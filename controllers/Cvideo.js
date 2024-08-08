const path = require("path");
const os = require("os");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("ffprobe-static").path;
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const s3 = require("../config/awsConfig"); // S3 클라이언트
const bucketName = process.env.S3_BUCKET_NAME;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// 썸네일 추출 함수
const extractThumbnail = (videoPath, thumbnailPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on("end", () => {
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      })
      .screenshots({
        count: 1,
        folder: thumbnailPath,
        filename: "thumbnail.png",
        size: "320x240",
      });
  });
};

// 동영상 재생시간 체크 함수
const checkVideoDuration = (videoPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        return reject(err);
      }
      const duration = metadata.format.duration;
      resolve(duration);
    });
  });
};

// S3에서 파일 다운로드 함수
const downloadFromS3 = async (bucket, key, downloadPath) => {
  const params = {
    Bucket: bucket,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  const data = await s3.send(command);

  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(downloadPath);
    data.Body.pipe(fileStream);
    data.Body.on("error", reject);
    fileStream.on("finish", resolve);
  });
};

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No video uploaded");
    }

    const videoUrl = req.file.location;
    const videoKey = req.file.key; // S3의 객체 키
    const videoDownloadPath = path.join(os.tmpdir(), "uploadedVideo");

    // S3에서 업로드된 동영상 다운로드
    await downloadFromS3(bucketName, videoKey, videoDownloadPath);

    // 동영상 재생시간 체크
    const duration = await checkVideoDuration(videoDownloadPath);
    if (duration > 60) {
      // 60초 이상인 경우 에러 반환
      return res.status(400).send("Video duration exceeds 1 minute");
    }

    const thumbnailPath = path.join(os.tmpdir(), "thumbnails");

    // 썸네일 디렉토리 생성
    if (!fs.existsSync(thumbnailPath)) {
      fs.mkdirSync(thumbnailPath);
    }

    // 썸네일 추출
    await extractThumbnail(videoDownloadPath, thumbnailPath);

    // 썸네일 파일 경로
    const thumbnailFilePath = path.join(thumbnailPath, "thumbnail.png");

    // 썸네일 파일 읽기
    const thumbnailFile = fs.readFileSync(thumbnailFilePath);

    // S3에 썸네일 업로드
    const thumbnailKey = `thumbnails/${Date.now().toString()}-thumbnail.png`;
    const uploadParams = {
      Bucket: bucketName,
      Key: thumbnailKey,
      Body: thumbnailFile,
      ContentType: "image/png",
      ACL: "public-read",
    };
    const uploadCommand = new PutObjectCommand(uploadParams);
    await s3.send(uploadCommand);

    const thumbnailUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${thumbnailKey}`;

    res.status(200).json({
      message: "Video uploaded successfully",
      videoUrl,
      thumbnailUrl,
    });
  } catch (error) {
    console.log("Error uploading video", error);
    res.status(500).send("Error uploading video");
  }
};
