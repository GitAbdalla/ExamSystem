import { check, body } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddlware.js";
import Exam from "../../models/examModel.js";
import Submission from "../../models/submissionModel.js";

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

const studentExamValidation = check("examId").custom(
  async (examId, { req }) => {
    const existing = await Submission.findOne({
      studentId: req.user._id,
      examId,
    });
    if (existing) {
      throw new Error("You already started this exam");
    }
    return true;
  }
);

const answersValidation = body("answers")
  .isArray({ min: 1 })
  .withMessage("At least one answer is required")
  .custom(async (answers) => {
    for (const answer of answers) {
      if (!answer.questionId || !answer.selectedOption) {
        throw new Error("Each answer must have questionId and selectedOption");
      }
    }
    return true;
  });

const questionIdValidation = body("answers.*.questionId")
  .isMongoId()
  .withMessage("Invalid question ID format")
  .custom(async (questionId) => {
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error(`Question with ID ${questionId} not found`);
    }
    return true;
  });

const optionValidation = body("answers.*.selectedOption")
  .notEmpty()
  .withMessage("Selected option is required")
  .custom(async (selectedOption, { req, path }) => {
    const questionIndex = path.match(/answers\.(\d+)\.selectedOption/)[1];
    const questionId = req.body.answers[questionIndex].questionId;
    const question = await Question.findById(questionId);

    if (!question.options.includes(selectedOption)) {
      throw new Error("Selected option must be one of the question options");
    }
    return true;
  });

export const validateStartSubmission = [
  examIdValidation,
  studentExamValidation,
  validatorMiddleware,
];

export const validateSubmitExam = [
  examIdValidation,
  answersValidation,
  questionIdValidation,
  optionValidation,
  validatorMiddleware,
];

export const validateGetStudentSubmission = [
  check("id").isMongoId().withMessage("Invalid exam ID format"),
  validatorMiddleware,
];

export const validateGetAllSubmissionsForExam = [
  check("id").isMongoId().withMessage("Invalid exam ID format"),
  validatorMiddleware,
];

export const validateGetExamLeaderBoard = [
  check("id").isMongoId().withMessage("Invalid exam ID format"),
  validatorMiddleware,
];
