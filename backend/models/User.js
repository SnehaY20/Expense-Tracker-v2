const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name can not be null"],
  },
  email: {
    type: String,
    required: [true, "Add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Add a password"],
    minlength: 5,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
