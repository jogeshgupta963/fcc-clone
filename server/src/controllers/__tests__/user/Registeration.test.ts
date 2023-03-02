import request from "supertest";
import { app } from "../../../app";

it("Successfull Basic Registeration returns 201", async () => {
  const response = await request(app).post("/api/user/basic/register").send({
    name: "Jogesh",
    email: "jogeshgupta963@gmail.com",
    password: "zxcvbnmm",
  });

  console.log(response.body);
  expect(response.statusCode).toEqual(201);
  expect(response.body.success).toEqual(true);
});

it("atleast 1 compulsory parameter not entered", async () => {
  const response = await request(app)
    .post("/api/user/basic/register")
    .send({
      name: "Jogesh",
      // email: "jogeshgupta963@gmail.com",
      password: "zxcvbnmm",
    })
    .expect(400);
  expect(response.body.success).toEqual(false);
});

it("Duplicate email registeration attempt", async () => {
  const res = await global.createBasicUser();
  const response1 = await request(app)
    .post("/api/user/basic/register")
    .send({
      name: "another name",
      email: res.email,
      password: "zxcvbnmm",
    })
    .expect(400);
  expect(response1.body.success).toEqual(false);
});

// google

it("Successfull Google Registeration returns 201", async () => {
  const response = await request(app)
    .post("/api/user/google/register")
    .send({
      name: "Jogesh",
      email: "jogeshgupta963@gmail.com",
      profile_pic: "asd",
      id_token: "qwertyuioplkjhgfdaszxcvbnm",
    })
    .expect(201);
  expect(response.body.success).toEqual(true);
});

it("duplicate Google Registeration 201", async () => {
  const res = await global.createGoogleUser();
  const response = await request(app)
    .post("/api/user/google/register")
    .send({
      name: "Jogesh",
      email: "jogeshgupta963@gmail.com",
      profile_pic: "asd",
      id_token: "qwertyuioplkjhgfdaszxcvbnm",
    })
    .expect(400);
  expect(response.body.success).toEqual(false);
});
