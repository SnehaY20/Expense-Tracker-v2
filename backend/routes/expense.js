const express = require("express");
const {
  getExpenses,
  createExpense,
  getExpensesByCategory,
  updateExpense,
  deleteExpense,
} = require("../controller/expense");

const router = express.Router();

router.route("/").get(getExpenses).post(createExpense);
router.route("/:id").put(updateExpense).delete(deleteExpense);
router.route("/category/:categoryId").get(getExpensesByCategory);

module.exports = router;
