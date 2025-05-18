import { check } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddlware.js";
import User from "../../models/userModel.js";

const emailValidation = check("email")
  .isEmail()
  .withMessage("Please provide a valid email")
  .normalizeEmail();

const passwordValidation = check("password")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long")

export const validateSignup = [
  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .custom(async (username) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("Username already in use");
      }
    }),

  emailValidation.custom(async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }
  }),

  passwordValidation,

  check("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("department")
    .notEmpty()
    .withMessage("Department is required")
    .isIn(["mearn", "dotnet", "python"])
    .withMessage("Invalid department"),
    validatorMiddleware
];

// Login validation
export const validateLogin = [

  check("password").notEmpty().withMessage("Password is required"),
  validatorMiddleware
];
