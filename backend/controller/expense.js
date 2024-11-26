const path = require("path");
const Expense = require("../models/Expense");
const Category = require("../models/Category");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");

// @desc     GET all expenses
// @route    GET /api/v1/expenses
// @access   Private
exports.getExpenses = asyncHandler(async (req, res, next) => {
  const expenses = await Expense.find().populate("category");
  res.status(200).json({ success: true, count: expenses.length, expenses });
});

// @desc     Create expense
// @route    POST /api/v1/expenses
// @access   Private
exports.createExpense = asyncHandler(async (req, res, next) => {
  const { category, description, amount } = req.body;

  // Check if category exists
  const validCategory = await Category.findById(category);
  if (!validCategory) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category ID" });
  }

  // Create the new expense with user linked to authenticated user
  let expense = await Expense.create({
    category,
    description,
    amount,
    user: req.user.id, // Ensure user is linked to authenticated user
  });

  // Populate category name and id
  expense = await Expense.findById(expense._id).populate(
    "category",
    "_id name"
  );

  res.status(201).send({ success: true, data: expense });
});

// @desc     GET expenses by category
// @route    GET /api/v1/expenses/category/:categoryId
// @access   Private
exports.getExpensesByCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;

  const validCategory = await Category.findById(categoryId);
  if (!validCategory) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category ID" });
  }

  const expenses = await Expense.find({ category: categoryId }).populate(
    "category",
    "_id name"
  );
  res
    .status(200)
    .json({ success: true, count: expenses.length, data: expenses });
});

// @desc     Update expense
// @route    PUT /api/v1/expenses/:id
// @access   Private
exports.updateExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { category, description, amount } = req.body;

  // Fetch expense and populate user field
  let expense = await Expense.findById(id).populate("user", "_id");

  // Check if the expense exists
  if (!expense) {
    return next(new ErrorResponse(`Expense with ID ${id} doesn't exist.`, 404));
  }

  // Log user IDs for debugging
  console.log("Authenticated User ID:", req.user.id);
  console.log(
    "Expense User ID:",
    expense.user ? expense.user._id.toString() : "No user"
  );

  // Check if the user is authorized to update the expense
  if (expense.user._id.toString() !== req.user.id) {
    return next(
      new ErrorResponse("Not authorized to update this expense", 401)
    );
  }

  // Update fields if provided in the request body
  expense.category = category || expense.category;
  expense.description = description || expense.description;
  expense.amount = amount || expense.amount;

  // Save the updated expense
  await expense.save();
  expense = await Expense.findById(expense._id).populate(
    "category",
    "_id name"
  );

  res.status(200).json({ success: true, data: expense });
});

// @desc     Delete expense
// @route    DELETE /api/v1/expenses/:id
// @access   Private
exports.deleteExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Check if the expense exists
  const expense = await Expense.findById(id);
  if (!expense) {
    return next(new ErrorResponse(`Expense with ID ${id} doesn't exist.`, 404));
  }

  // Check if the user is authorized to delete the expense
  if (expense.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse("Not authorized to delete this expense", 401)
    );
  }

  // Delete the expense
  await Expense.findByIdAndDelete(id);

  res
    .status(200)
    .json({ success: true, message: "Expense deleted successfully." });
});
