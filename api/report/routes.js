const express = require("express");
const { generateReport } = require("./controller");

const router = express.Router();

router.post("/", generateReport);


module.exports = router;