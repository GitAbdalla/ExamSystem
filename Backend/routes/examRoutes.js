import express from 'express';
import { createExam, deleteExam, getAllExams, getAvailableExams, getExamById, updateExam } from '../controllers/examController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';



const router = express.Router();

router.get('/exams', protect , restrictTo('admin'), getAllExams)
router.get('/exams/available', protect , restrictTo('student') ,getAvailableExams)
router.get('/exams/:id', protect , restrictTo('admin'), getExamById)
router.post('/exams', protect , restrictTo('admin')  ,createExam);
router.put('/exams/:id', protect , restrictTo('admin'), updateExam);
router.delete('/exams/:id', protect, restrictTo('admin'), deleteExam);





export default router