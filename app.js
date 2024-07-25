require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const apiRoutes = require("./routes/index");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", apiRoutes); // API 라우트 설정

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
