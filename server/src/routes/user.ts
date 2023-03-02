import express from "express";
import { basicLogin, googleLogin } from "../controllers/user/login";
import {
  basicLoginArgs,
  basicRegisterArgs,
  googleLoginArgs,
  googleRegisterArgs,
} from "../utils/validators";
import { requestValidator } from "../middlewares/request-validator";
import { basicRegister, googleRegister } from "../controllers/user/register";

const router = express.Router();

router
  .route("/google/login")
  .post(googleLoginArgs, requestValidator, googleLogin);
router.route("/basic/login").post(basicLoginArgs, requestValidator, basicLogin);

router
  .route("/google/register")
  .post(googleRegisterArgs, requestValidator, googleRegister);

router
  .route("/basic/register")
  .post(basicRegisterArgs, requestValidator, basicRegister);

export { router as userRouter };
