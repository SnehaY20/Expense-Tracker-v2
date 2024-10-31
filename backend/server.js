const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger.js");
const connectDB = require("./config/db.js");

// Load env variables
dotenv.config({ path: "./.env" });

connectDB();

// Bring in Route files
const expense = require("./routes/expense.js");
const category = require("./routes/category.js");

const app = express();

// Body parser
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello Sneha here!</h1>");
});

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(logger);
}

// Mount routers (path)
app.use("/api/v1/expenses", expense);
app.use("/api/v1/categories", category);

app.listen(PORT, () => {
  PORT,
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});
