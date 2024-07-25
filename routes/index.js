const express = require("express");
const router = express.Router();
const Cmain = require("../controllers/Cmain");
const authRoutes = require("./auth");

router.use("/auth", authRoutes);
router.get("/", Cmain.getMessage);

module.exports = router;
