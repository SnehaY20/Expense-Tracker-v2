const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      "Food",
      "Transport",
      "Utilities",
      "Entertainment",
      "Healthcare",
      "Other" 
    ],
    required: [true, "Select category"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
