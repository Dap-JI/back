require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", apiRoutes); // API 라우트 설정

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
