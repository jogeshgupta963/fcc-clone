import request from "supertest";
import { app } from "../../../app";

it("get all courses", async () => {
  await global.createCourses();
  const res = await request(app).get("/api/course");
  expect(res.statusCode).toEqual(200);
  expect(res.body.success).toEqual(true);
});
it("get course by id", async () => {
  const course = await global.createCourses();
  const cookie = await global.getCookie();
  const id = course[0]._id.toString();
  const res = await request(app).get(`/api/course/${id}`).set("Cookie", cookie);
  expect(res.statusCode).toEqual(200);
  expect(res.body.success).toEqual(true);
  //   console.log(course);
});
it("get course by id unauthenticated", async () => {
  const course = await global.createCourses();
  const id = course[0]._id.toString();
  const res = await request(app).get(`/api/course/${id}`);
  expect(res.statusCode).toEqual(400);
  expect(res.body.success).toEqual(false);
});
