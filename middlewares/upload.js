const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../config/awsConfig");

const bucketName = process.env.S3_BUCKET_NAME;

const getKey = (folder) => (req, file, cb) => {
  const fileName = `${folder}/${Date.now().toString()}-${file.originalname}`;
  cb(null, fileName);
};

const upload = (folder) =>
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
  });

module.exports = {
  uploadGymLogo: upload("gym-logos"),
  uploadProfilePicture: upload("profile-pictures"),
  uploadBoardImage: upload("board-images"),
};
