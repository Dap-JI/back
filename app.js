require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const db = require("./models");
const apiRoutes = require("./routes/index");
const imageRoutes = require("./routes/image");
const { swaggerUi, specs } = require("./swagger");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET, // 비밀 키 설정
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // 개발 환경에서는 false로 설정, 배포 시 true로 설정
  })
);

app.use("/api", imageRoutes);
app.use("/api", apiRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // Swagger UI 설정

// 데이터베이스 동기화
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
