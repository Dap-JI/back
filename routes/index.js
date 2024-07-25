const express = require("express");
const router = express.Router();
const Cmain = require("../controllers/Cmain");

router.get("/", Cmain.getMessage);

module.exports = router;
