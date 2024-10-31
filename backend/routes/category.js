const express = require("express");
const { createCategory, getCategories } = require("../controller/category");
const router = express.Router();

router.route("/").post(createCategory).get(getCategories);

module.exports = router;
