import express from 'express';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';
import { createQuestion, deleteQuestion, getExamQuestions, updateQuestion } from '../controllers/questionController.js';
import { validateCreateQuestion, validateDeleteQuestion, validateGetExamQuestions, validateUpdateQuestion } from '../utils/validator/questionValidator.js';


const router = express.Router();

router.get("/exams/:id/questions", protect, validateGetExamQuestions ,getExamQuestions);
router.post("/questions", protect, restrictTo("admin"), validateCreateQuestion ,createQuestion);
router.put("/questions/:id", protect, restrictTo("admin"), validateUpdateQuestion ,updateQuestion);
router.delete('/questions/:id', protect, restrictTo('admin'), validateDeleteQuestion ,deleteQuestion);



export default router