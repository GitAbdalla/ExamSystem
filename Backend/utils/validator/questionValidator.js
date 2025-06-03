import { check, body } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddlware.js";
import Exam from "../../models/examModel.js";

// Common validations
const examIdValidation = check("examId")
  .notEmpty()
  .withMessage("Exam ID is required")
  .isMongoId()
  .withMessage("Invalid Exam ID format")
  .custom(async (examId) => {
    const exam = await Exam.findById(examId);
    if (!exam) {
      throw new Error("Exam not found");
    }
    return true;
  });

const questionTextValidation = check("questionText")
  .notEmpty()
  .withMessage("Question text is required")
  .isLength({ min: 10 })
  .withMessage("Question must be at least 10 characters long");

const optionsValidation = body("options")
  .isArray({ min: 4, max: 4 })
  .withMessage("Question must have exactly 4 options")
  .custom((options) => {
    if (new Set(options).size !== options.length) {
      throw new Error("Options must be unique");
    }
    return true;
  });

const correctAnswerValidation = body("correctAnswer")
  .notEmpty()
  .withMessage("Correct answer is required")
  .custom((value, { req }) => {
    if (!req.body.options || !req.body.options.includes(value)) {
      throw new Error("Correct answer must be one of the provided options");
    }
    return true;
  });

export const validateCreateQuestion = [
  examIdValidation,
  questionTextValidation,
  optionsValidation,
  correctAnswerValidation,
  validatorMiddleware,
];

export const validateUpdateQuestion = [
  check("id").isMongoId().withMessage("Invalid question ID format"),
  examIdValidation.optional(),
  questionTextValidation.optional(),
  optionsValidation.optional(),
  correctAnswerValidation.optional(),
  validatorMiddleware,
];

export const validateDeleteQuestion = [
  check("id").isMongoId().withMessage("Invalid question ID format"),
  validatorMiddleware,
];

export const validateGetExamQuestions = [
  check("id").isMongoId().withMessage("Invalid exam ID format"),
  validatorMiddleware,
];
