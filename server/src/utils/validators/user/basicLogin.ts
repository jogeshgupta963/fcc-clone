import { body } from "express-validator";
export const basicLoginArgs = [
  body("email").isEmail().withMessage("Email is missing"),
  body("password").isString().withMessage("Password is missing"),
];
