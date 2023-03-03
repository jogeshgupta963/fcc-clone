import request from "supertest";
import { app } from "../../app";
import { Course } from "../../models/courses";
import { courses } from "../../data/courses";
export const createCourse = async () => {
  const course = await Course.insertMany(courses);
  //   console.log(course);
  return course;
};
