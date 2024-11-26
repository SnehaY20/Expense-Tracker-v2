const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger.js");
const error = require("./middleware/error.js");
const connectDB = require("./config/db.js");

// Load env variables
dotenv.config({ path: "./.env" });

// Connect to the database
connectDB();

// Initialize express app
const app = express();

// Body parser
app.use(express.json());

// Import route files
const expense = require("./routes/expense.js");
const category = require("./routes/category.js");
const auth = require("./routes/auth.js");

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(logger);
}

// Simple route for testing
app.get("/", (req, res) => {
  res.send("<h1>Hello Sneha here!</h1>");
});

// Mount routers
app.use("/api/v1/expenses", expense);
app.use("/api/v1/categories", category);
app.use("/api/v1/auth", auth);

// Error handling middleware (must come after routes)
app.use(error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
