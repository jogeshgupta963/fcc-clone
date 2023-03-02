import { body } from "express-validator";
export const basicRegisterArgs = [
  body("email").isEmail().withMessage("Email is missing"),
  body("password").isString().withMessage("id_token is missing"),
  body("name").isString().withMessage("name is missing"),
];
