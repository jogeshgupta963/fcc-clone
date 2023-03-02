import { body } from "express-validator";
export const googleRegisterArgs = [
  body("email").isEmail().withMessage("Email is missing"),
  body("id_token").isString().withMessage("id_token is missing"),
  body("name").isString().withMessage("name is missing"),
  body("profile_pic").isString().withMessage("profile pic is missing"),
];
