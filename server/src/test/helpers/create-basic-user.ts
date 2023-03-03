import request from "supertest";
import { app } from "../../app";

export const createBasicUser = async (
  name = "jogesh",
  password = "zxcvbnmm",
  email = "jogeshgupta963@gmail.com"
) => {
  const response = await request(app)
    .post("/api/user/basic/register")
    .send({
      name,
      email,
      password,
    })
    .expect(201);
  expect(response.body.success).toEqual(true);

  return response.body.data;
};
