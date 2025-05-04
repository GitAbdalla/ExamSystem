import User from "../models/userModel.js";

import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password,confirmPassword, department } = req.body;
    if(password !== confirmPassword){
      return res.status(400).json({
        message:"Passwords not identical"
      })
    }
    const user = await User.create({ username, email, password, department });
    const token = generateToken(user);

    res.status(201).json({
      status: "success",
      message: "Signed up successfully",
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
