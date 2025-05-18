import Exam from "../models/examModel.js";

export const createExam = async (req, res) => {
  try {
    const {
      title,
      description,
      department,
      startTime,
      endTime,
      durationMinutes,
    } = req.body;

    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({
        status: "fail",
        message: "start time must be before end time",
      });
    }

    const exam = await Exam.create({
      title,
      description,
      department,
      startTime,
      endTime,
      durationMinutes,
      createdBy: req.user._id,
    });
    res.status(201).json({
      status: "success",
      message: "Exam created successfully",
      data: { exam },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: err.message,
    });
  }
};

export const updateExam = async (req, res) => {
  const { id } = req.params;

  try {
    const exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).json({
        message: "Exam Not found",
      });
    }
    if (exam.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to update this exam",
      });
    }

    if (new Date() >= new Date(exam.startTime)) {
      return res.status(400).json({
        message: "Cannot update an exam after it has started",
      });
    }

    const updatedExam = await Exam.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Exam Updated successfully",
      exam: updatedExam,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: err.message,
    });
  }
};

export const deleteExam = async (req, res) => {
  const { id } = req.params;

  try {
    const exam = await Exam.findByIdAndDelete(id);
    if (!exam) {
      return res.status(400).json({
        message: "Exam not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Exam deleted successfully",
      deleteExam: exam,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: err.message,
    });
  }
};
