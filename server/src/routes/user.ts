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
import { isLoggedIn } from "../middlewares/is-logged-in";
import { getCurrentUser } from "../controllers/user/get-user";

const router = express.Router();

router.route("/").get(isLoggedIn, getCurrentUser);

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
