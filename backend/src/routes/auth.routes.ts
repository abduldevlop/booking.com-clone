import { Router } from "express";
import { LoginUser } from "../controllers/auth.controller";

import { body } from "express-validator";

const router = Router();

router.post(
  "/login",
  body("email").trim().notEmpty().withMessage("Please wite a email adrasss"),
  body("password").isLength({ min: 6 }).withMessage("Password shoud 6 letter!"),
  LoginUser
);

export default router;
