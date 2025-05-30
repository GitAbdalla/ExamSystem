import express from "express";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import { getAllSubmissionsForExam, getMySubmissions, getStudentSubmission, startSubmission, submitExam } from "../controllers/submissionController.js";

const router = express.Router();

router.post("/submissions/start", protect, restrictTo("student"), startSubmission);
router.post("/submissions/submit", protect, restrictTo("student"), submitExam);

router.get("/submissions/:id" , protect , getStudentSubmission);
router.get("/submissions/my-submissions" , protect , getMySubmissions);
router.get("/exams/:id/submissions", protect , restrictTo("admin") ,  getAllSubmissionsForExam)
export default router;
