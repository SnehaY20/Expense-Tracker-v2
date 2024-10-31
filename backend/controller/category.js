const Category = require("../models/Category.js");
const asyncHandler = require("../middleware/async.js");

// @desc     Create a new category
// @route    POST /api/v1/categories
// @access   Private
exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  // Check if category already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res
      .status(400)
      .json({ success: false, message: "Category already exists" });
  }

  // Create the new category
  const category = await Category.create({ name });
  res.status(201).json({ success: true, data: category });
});

// @desc     Get all categories
// @route    GET /api/v1/categories
// @access   Private
exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({ success: true, count: categories.length, categories });
});
