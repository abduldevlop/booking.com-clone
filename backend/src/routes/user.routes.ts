import { Router } from "express";
import { registerUser } from "../controllers/user.controller";

import { body } from "express-validator";

const router = Router();

router.post(
  "/register",
  [
    // Add validation middleware using express-validator
    body("firstname").trim().notEmpty().withMessage("First name is required"),
    body("lastname").trim().notEmpty().withMessage("Last name is required"),
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

export default router;
