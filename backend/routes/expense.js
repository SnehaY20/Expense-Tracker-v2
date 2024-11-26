const express = require("express");
const {
  getExpenses,
  createExpense,
  getExpensesByCategory,
  updateExpense,
  deleteExpense,
} = require("../controller/expense");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getExpenses).post(protect, createExpense);

router.route("/:id").put(protect, updateExpense).delete(protect, deleteExpense);

router.route("/category/:categoryId").get(getExpensesByCategory);

module.exports = router;
