import mongoose from "mongoose";

import Question from "../models/questionModel.js";
import Exam from "../models/examModel.js";

export const createQuestion = async (req, res) => {
  try {
    const { examId, questionText, options, correctAnswer } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    if (!options || options.length !== 4) {
      return res
        .status(400)
        .json({ message: "Question must have exactly 4 options" });
    }

    const newQuestion = await Question.create({
      examId,
      questionText,
      options,
      correctAnswer,
    });

    res.status(201).json({
      status: "success",
      message: "Question created",
      data: newQuestion,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateQuestion) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Question updated successfully",
      data: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Question.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExamQuestions = async (req, res) => {
  try {
    const {id} = req.params;
    const questions = await Question.find({ examId: id })
                                  .select("-correctAnswer");

    if (!questions.length) {
      return res.status(200).json({
        status: "success",
        message: "No questions available for this exam yet",
        questions: []
      });
    }

    return res.status(200).json({
      status: "success",
      count: questions.length,
      questions
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};