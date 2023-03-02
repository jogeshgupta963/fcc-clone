import { body } from "express-validator";
export const googleLoginArgs = [
  body("id_token").isString().withMessage("Id Token is missing"),
];
