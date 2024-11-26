const Category = require("../models/Category.js");
const asyncHandler = require("../middleware/async.js");
const ErrorResponse = require("../utils/errorResponse.js");

// @desc     Create a new category
// @route    POST /api/v1/categories
// @access   Admin
exports.createCategory = asyncHandler(async (req, res, next) => {
  // Only allow admin users
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Only admins can create categories",
    });
  }

  const { name } = req.body;

  // Check if category already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: "Category already exists",
    });
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

// @desc     Delete a category
// @route    DELETE /api/v1/categories/:id
// @access   Admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  // Only allow admin users
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse("Not authorized to delete this category", 401)
    );
  }

  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${id}`));
  }

  // Use deleteOne or findByIdAndDelete
  await Category.findByIdAndDelete(id); // This removes the category

  res.status(200).json({ success: true, message: "Category deleted" });
});
