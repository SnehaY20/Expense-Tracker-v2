const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token Payload:", decoded);

    // Fetch user from the database
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      console.log("No user found for the given token.");
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }

    console.log("Authenticated User:", req.user);

    next();
  } catch (err) {
    console.error("Error verifying token:", err.message);
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      console.log(
        `Authorization failed: User role ${
          req.user?.role || "undefined"
        } is not authorized.`
      );
      return next(
        new ErrorResponse(
          `User role ${
            req.user?.role || "undefined"
          } is not authorized to access this route`,
          403
        )
      );
    }
    console.log(`User role ${req.user.role} authorized for this route.`);
    next();
  };
};
