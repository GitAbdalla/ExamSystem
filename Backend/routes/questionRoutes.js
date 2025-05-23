import express from 'express';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';
import { createQuestion, deleteQuestion, getExamQuestions, updateQuestion } from '../controllers/questionController.js';


const router = express.Router();

router.get("/exams/:id/questions", protect, getExamQuestions);
router.post("/questions", protect, restrictTo("admin"), createQuestion);
router.put("/questions/:id", protect, restrictTo("admin"), updateQuestion);
router.delete('/questions/:id', protect, restrictTo('admin'), deleteQuestion);



export default router