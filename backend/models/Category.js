const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      "Food",
      "Travelling",
      "Shopping",
      "Entertainment",
      "Healthcare",
      "Skincare",
      "Groceries",
      "Other",
    ],
    required: [true, "Select category"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
