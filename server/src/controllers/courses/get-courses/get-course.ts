import { Request, Response } from "express";
import { Course } from "../../../models/courses";

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { course_id } = req.params;
    const course = await Course.findById(course_id);
    if (!course) throw new Error("Course Doesnt exist");
    return res.status(200).json({
      success: true,
      data: course || [],
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        succcess: false,
        data: err.message,
      });
    }
  }
};
