import express from "express";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import { getAllSubmissionsForExam, getExamLeaderBoard, getMySubmissions, getStudentSubmission, startSubmission, submitExam } from "../controllers/submissionController.js";
import { validateGetAllSubmissionsForExam, validateGetExamLeaderBoard, validateGetStudentSubmission, validateStartSubmission, validateSubmitExam } from "../utils/validator/submissionValidator.js";

const router = express.Router();

router.post("/submissions/start", protect, restrictTo("student"), validateStartSubmission ,startSubmission);
router.post("/submissions/submit", protect, restrictTo("student"), validateSubmitExam,submitExam);

router.get("/submissions/my-submissions" , protect , getMySubmissions);
router.get("/submissions/:id" , protect , validateGetStudentSubmission ,getStudentSubmission);
router.get("/submissions/leaderboard/:id" , protect , validateGetExamLeaderBoard ,getExamLeaderBoard);
router.get("/exams/:id/submissions", protect , restrictTo("admin") , validateGetAllSubmissionsForExam ,getAllSubmissionsForExam);
export default router;
