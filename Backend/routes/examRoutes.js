import express from 'express';
import { createExam, deleteExam, getAllExams, getAvailableExams, getExamById, updateExam } from '../controllers/examController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';
import { validateCreateExam, validateDeleteExam, validateGetExamById, validateUpdateExam } from '../utils/validator/examValidator.js';



const router = express.Router();

router.get('/exams', protect , restrictTo('admin'), getAllExams)
router.get('/exams/available', protect , restrictTo('student') ,getAvailableExams)
router.get('/exams/:id', protect , restrictTo('admin'), validateGetExamById ,getExamById)
router.post('/exams', protect , restrictTo('admin') , validateCreateExam ,createExam);
router.put('/exams/:id', protect , restrictTo('admin'), validateUpdateExam ,updateExam);
router.delete('/exams/:id', protect, restrictTo('admin'), validateDeleteExam ,deleteExam);





export default router