import { check } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddlware.js";
import Exam from "../../models/examModel.js";

const titleValidation = check("title")
  .notEmpty()
  .withMessage("Exam title is required")
  .isLength({ min: 5 })
  .withMessage("Title must be at least 5 characters long");

const descriptionValidation = check("description")
  .notEmpty()
  .withMessage("Exam description is required")
  .isLength({ min: 10 })
  .withMessage("Description must be at least 10 characters long");

const departmentValidation = check("department")
  .notEmpty()
  .withMessage("Department is required")
  .isIn(["mearn", "dotnet", "python"])
  .withMessage("Invalid department");

const startTimeValidation = check("startTime")
  .notEmpty()
  .withMessage("Start time is required")
  .isISO8601()
  .withMessage("Invalid date format, use ISO8601 (e.g., YYYY-MM-DDTHH:MM:SSZ)")
  .custom((value, { req }) => {
    if (new Date(value) <= new Date()) {
      throw new Error("Start time must be in the future");
    }
    return true;
  });

const endTimeValidation = check("endTime")
  .notEmpty()
  .withMessage("End time is required")
  .isISO8601()
  .withMessage("Invalid date format, use ISO8601 (e.g., YYYY-MM-DDTHH:MM:SSZ)")
  .custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.startTime)) {
      throw new Error("End time must be after start time");
    }
    return true;
  });

const durationValidation = check("durationMinutes")
  .notEmpty()
  .withMessage("Duration is required")
  .isInt({ min: 10 })
  .withMessage("Duration must be at least 10 minute");

export const validateCreateExam = [
  titleValidation,
  descriptionValidation,
  departmentValidation,
  startTimeValidation,
  endTimeValidation,
  durationValidation,
  validatorMiddleware,
];

export const validateUpdateExam = [
  check("id").isMongoId().withMessage("Invalid exam ID format"),
  titleValidation.optional(),
  descriptionValidation.optional(),
  departmentValidation.optional(),
  startTimeValidation.optional(),
  endTimeValidation.optional(),
  durationValidation.optional(),
  validatorMiddleware,
];

export const validateDeleteExam = [
  check("id").isMongoId().withMessage("Invalid exam ID format"),
  validatorMiddleware,
];

export const validateGetExamById = [
  check("id").isMongoId().withMessage("Invalid exam ID format"),
  validatorMiddleware,
];
