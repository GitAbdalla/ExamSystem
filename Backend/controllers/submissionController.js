import Submission from "../models/submissionModel.js";
import Exam from "../models/examModel.js";
import Question from "../models/questionModel.js";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";
import { getIO } from "../config/socket.js";
import { onlineUsers } from "../utils/onlineUsers.js";

export const startSubmission = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { examId } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const existing = await Submission.findOne({ studentId, examId });
    if (existing) {
      return res.status(400).json({ message: "You already started this exam" });
    }

    const submission = await Submission.create({
      studentId,
      examId,
    });

    res.status(201).json({
      status: "success",
      submission,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitExam = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { examId, answers } = req.body;

    const submission = await Submission.findOne({ studentId, examId });
    if (!submission) {
      return res
        .status(404)
        .json({ message: "Submission not found , start exam first" });
    }

    if (submission.submittedAt) {
      return res
        .status(400)
        .json({ message: "You already submitted this exam" });
    }

    let score = 0;
    const processedAnswers = [];

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);
      if (!question) continue;

      const isCorrect = question.correctAnswer === ans.selectedOption;
      if (isCorrect) score++;

      processedAnswers.push({
        questionId: question._id,
        selectedOption: ans.selectedOption,
        isCorrect,
      });
    }

    const totalQuestions = processedAnswers.length;
    const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    submission.answers = processedAnswers;
    submission.score = score;
    submission.percentage = percentage;
    submission.submittedAt = new Date();

    await submission.save();

    const io = getIO();

    const exam = await Exam.findById(examId).populate("createdBy");
    const adminId = exam.createdBy._id.toString();

    const student = await User.findById(studentId);
    const message = `📝 ${student.username} submitted "${
      exam.title
    }" with ${submission.percentage.toFixed(2)}%`;

    await Notification.create({
      recipient: adminId,
      message,
    });

    const socketId = onlineUsers.get(adminId.toString());
    if (socketId) {
      io.to(socketId).emit("notification", { message, type: "submission" });
    }

    res.status(200).json({
      message: "Submission successful",
      score,
      totalQuestions,
      percentage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentSubmission = async (req, res) => {
  try {
    const studentId = req.user._id;
    const examId = req.params.id;

    const submission = await Submission.findOne({ studentId, examId })
      .populate("examId", "title")
      .populate("answers.questionId", "questionText options");

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    res.status(200).json({
      exam: submission.examId.title,
      score: submission.score,
      percentage: submission.percentage,
      submittedAt: submission.submittedAt,
      answers: submission.answers.map((ans) => ({
        question: ans.questionId.questionText,
        options: ans.questionId.options,
        selectedOption: ans.selectedOption,
        isCorrect: ans.isCorrect,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSubmissionsForExam = async (req, res) => {
  try {
    const examId = req.params.id;

    const submissions = await Submission.find({ examId })
      .populate("studentId", "username email")
      .populate("examId", "title");

    res.status(200).json({
      exam: submissions[0]?.examId?.title || "Unknown",
      totalSubmissions: submissions.length,
      submissions: submissions.map((sub) => ({
        student: sub.studentId.username,
        email: sub.studentId.email,
        score: sub.score,
        percentage: sub.percentage,
        submittedAt: sub.submittedAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMySubmissions = async (req, res) => {
  try {
    const studentId = req.user._id;

    const submission = await Submission.find({ studentId })
      .populate("examId", "title")
      .sort({ submittedAt: -1 });

    const history = submission.map((sub) => ({
      examTitle: sub.examId?.title || "Unknown Exam",
      score: sub.score,
      percentage: sub.percentage,
      submittedAt: sub.submittedAt,
    }));

    res.status(200).json({
      status: "success",
      count: history.length,
      history,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExamLeaderBoard = async (req, res) => {
  try {
    const examId = req.params.id;

    const submission = await Submission.find({ examId })
      .populate("studentId", "username")
      .sort({ percentage: -1 })
      .limit(10);

    const leaderboard = submission.map((sub, index) => ({
      rank: index + 1,
      studentName: sub.studentId?.username || "Unknown",
      score: sub.score,
      percentage: sub.percentage,
    }));

    res.status(200).json({
      status: "success",
      examId,
      top: leaderboard.length,
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
