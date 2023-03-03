//basic login
import request from "supertest";
import { app } from "../../../app";

it("successfull login", async () => {
  const user = await global.createBasicUser("jogesh", "zxcvbnmm");

  const res = await request(app).post("/api/user/basic/login").send({
    email: user.email,
    password: "zxcvbnmm",
  });
  expect(res.statusCode).toEqual(200);
  expect(res.body.success).toEqual(true);
});

it("user doesnt exist", async () => {
  const user = await global.createBasicUser("jogesh", "zxcvbnmm");

  const res = await request(app).post("/api/user/basic/login").send({
    email: "jogesh@gmail.com",
    password: "zxcvbnmm",
  });
  expect(res.statusCode).toEqual(400);
  expect(res.body.success).toEqual(false);
});

it("Incorrect password", async () => {
  const user = await global.createBasicUser("jogesh", "zxcvbnmm");

  const res = await request(app).post("/api/user/basic/login").send({
    email: user.email,
    password: "zxcvbnm",
  });
  expect(res.statusCode).toEqual(400);
  expect(res.body.success).toEqual(false);
});

it("User registered from Google", async () => {
  const user = await global.createGoogleUser();

  const res = await request(app).post("/api/user/basic/login").send({
    email: user.email,
    password: "zxcvbnm",
  });
  expect(res.statusCode).toEqual(400);
  expect(res.body.success).toEqual(false);
});

//google login

it("successfull google login", async () => {
  const user = await global.createGoogleUser();

  const res = await request(app).post("/api/user/google/login").send({
    id_token: user.id_token,
  });
  expect(res.statusCode).toEqual(200);
  expect(res.body.success).toEqual(true);
});

it("user doesnt exist", async () => {
  const user = await global.createGoogleUser();

  const res = await request(app).post("/api/user/google/login").send({
    id_token: "asclaskdfoa",
  });
  expect(res.statusCode).toEqual(400);
  expect(res.body.success).toEqual(false);
});

it("User registered from credentials", async () => {
  const user = await global.createBasicUser();

  const res = await request(app).post("/api/user/basic/login").send({
    email: user.email,
    id_token: user.password,
  });
  expect(res.statusCode).toEqual(400);
  expect(res.body.success).toEqual(false);
});
