const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/awsConfig");

const bucketName = process.env.S3_BUCKET_NAME;

const getKey = (folder) => (req, file, cb) => {
  const fileName = `${folder}/${Date.now().toString()}-${file.originalname}`;
  cb(null, fileName);
};

const upload = (folder, fileFilter) =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      acl: "public-read",
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: getKey(folder),
    }),
    fileFilter: fileFilter,
  });

const videoFileFilter = (req, file, cb) => {
  const allowedTypes = ["video/mp4", "video/avi", "video/mov", "video/wmv"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Invalid file type");
    error.code = "INVALID_FILE_TYPE";
    return cb(error, false);
  }
  cb(null, true);
};

module.exports = {
  uploadGymLogo: upload("gym-logos"),
  uploadProfilePicture: upload("profile-pictures"),
  uploadBoardImage: upload("board-images"),
  uploadVideo: upload("videos", videoFileFilter), // 새로운 동영상 업로드 설정 추가
};
