const express = require("express");
const { fetch,add,update,remove } = require("./controller");

const router = express.Router();

router.get("/", fetch);
router.post("/", add);
router.put("/", update);
router.delete("/", remove);

module.exports = router;