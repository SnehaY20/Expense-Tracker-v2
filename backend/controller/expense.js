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

// @desc     Create  expense
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

  // Create the new expense
  let expense = await Expense.create({
    category,
    description,
    amount,
  });

  // Populate category name and id
  expense = await Expense.findById(expense._id).populate(
    "category",
    "_id name"
  );

  // const expense = await Expense.create({
  //   category,
  //   description,
  //   amount,
  // })
  res.status(201).send({ success: true, data: expense });
});

// @desc     GET expenses by category
// @route    GET /api/v1/expenses/category/:categoryId
// @access   Private
exports.getExpensesByCategory = asyncHandler(async (req, res, next) => {
  const { categoryId } = req.params;

  console.log("Received category ID:", categoryId);

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

// @desc     Update  expense
// @route    PUT /api/v1/expenses/:id
// @access   Private
exports.updateExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { category, description, amount } = req.body;

  // Check if the expense exists
  let expense = await Expense.findById(id);
  if (!expense) {
    return next(new ErrorResponse(`Expense with ID ${id} doesn't exist.`));
  } else if (expense.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse("Not authorized to update this expense", 401)
    );
  }

  // If value is changed then update the new value else it remains unchanged.
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

// @desc     Delete  expense
// @route    DELETE /api/v1/expenses
// @access   Private
exports.deleteExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Check if the expense exists
  const expense = await Expense.findById(id);
  if (!expense) {
    return next(new ErrorResponse(`Expense with ID ${id} doesn't exist.`));
  } else if (expense.user.toString() !== req.user.id) {
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
