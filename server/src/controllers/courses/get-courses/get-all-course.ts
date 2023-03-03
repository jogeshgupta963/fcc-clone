import { Request, Response } from "express";
import { Course } from "../../../models/courses";

export const getAllCourse = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({});
    return res.status(200).json({
      success: true,
      data: courses || [],
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
