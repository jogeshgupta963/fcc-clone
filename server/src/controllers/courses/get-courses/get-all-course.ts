import { Request, Response } from "express";
import { Course } from "../../../models/courses";
import { dbResTimeHist } from "../../../metrics/metrics";

export const getAllCourse = async (req: Request, res: Response) => {
  const metricLabels = {
    operation: "Get all Courses",
  };
  const timer = dbResTimeHist.startTimer();
  try {
    const courses = await Course.find({});
    timer({ ...metricLabels, success: "true" });
    return res.status(200).json({
      success: true,
      data: courses || [],
    });
  } catch (err) {
    if (err instanceof Error) {
      timer({ ...metricLabels, success: "false" });
      res.status(400).json({
        succcess: false,
        data: err.message,
      });
    }
  }
};
