const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

// Load env variables
dotenv.config({ path: "./.env" });

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello Sneha here!</h1>");
});

app.listen(PORT, () => {
  PORT,
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});
