import express from "express";
import { getAllCourse } from "../controllers/courses/get-courses";
import { isLoggedIn } from "../middlewares/is-logged-in";
import { getCourseById } from "../controllers/courses/get-courses/get-course";

const router = express.Router();

router.route("/").get(getAllCourse);
router.route("/:course_id").get(isLoggedIn, getCourseById);

export { router as courseRouter };
