import { Request, Response } from "express";
import { User } from "../database/models/user.models";

import jwt from "jsonwebtoken";
import brcypt from "bcrypt";
import { validationResult } from "express-validator";

export const LoginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    // found user exisr or not
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found wit this email!" });
      return;
    }
    // chack email is correct

    // chack password
    const isPasswordCorrect = await brcypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json("Incorrect Credential!");
      return;
    } else {
      // genrtae jwt token
      const token = jwt.sign(
        { userID: user._id },
        process.env.JWT_SECRET_TOKEN as string
      );
      res.cookie("auth_token", token, { httpOnly: true, maxAge: 86400000 }); // max age 1 day
      res.status(200).json({ mesage: "User login successfully!" });
    }
  } catch (error) {}
};
