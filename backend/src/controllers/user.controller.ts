import { Request, Response } from "express";
import { User } from "../database/models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
export const registerUser = async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    // chack user is alredy register or not
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json("User has alredy register!");
    }

    // craeting a new user
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...req.body, password: hashPassword });

    // genrate jwt toke
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_TOKEN as string
    );
    await newUser.save();

    res.cookie("auth_token", token, { httpOnly: true, maxAge: 86400000 }); // max age 1 day
    res.status(201).json({
      message: "User register succsefully!",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};
