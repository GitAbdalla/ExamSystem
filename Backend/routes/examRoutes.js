import express from 'express';
import { createExam, deleteExam, updateExam } from '../controllers/examController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';



const router = express.Router();


router.post('/exams', protect , restrictTo('admin')  ,createExam);
router.put('/exams/:id', protect , restrictTo('admin'), updateExam);
router.delete('/exams/:id', protect, restrictTo('admin'), deleteExam);




export default router