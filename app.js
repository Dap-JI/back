require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const db = require("./models");
const apiRoutes = require("./routes/index");
const imageRoutes = require("./routes/image");
const videoRoutes = require("./routes/video"); // 비디오 라우터 추가
const { swaggerUi, specs } = require("./swagger");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET, // 비밀 키 설정
    resave: false, // 세션이 수정되지 않았어도 저장
    saveUninitialized: true, // 초기화되지 않은 세션을 저장
    cookie: {
      httpOnly: true, // 클라이언트 측에서 쿠키 접근 불가
      maxAge: 3600000, // 쿠키의 만료 시간 (밀리초 단위)
      secure: false, // 개발 환경에서는 false로 설정, 배포 시 true로 설정
    },
  })
);

app.use("/api", imageRoutes);
app.use("/api", videoRoutes);
app.use("/api", apiRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // Swagger UI 설정

// 데이터베이스 동기화
db.sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("Database synchronized");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
