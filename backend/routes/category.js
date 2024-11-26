const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controller/category");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .post(protect, authorize("admin"), createCategory)
  .get(getCategories);
router.route("/:id").delete(protect, authorize("admin"), deleteCategory);

module.exports = router;
