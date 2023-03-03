import request from "supertest";
import { app } from "../../app";
export const createGoogleUser = async (
  name = "jogesh",
  email = "jogeshgupta963@gmail.com",
  profile_pic = "deffault",
  id_token = "xzcvbnm"
) => {
  const response = await request(app)
    .post("/api/user/google/register")
    .send({
      name,
      email,
      id_token,
      profile_pic,
    })
    .expect(201);
  expect(response.body.success).toEqual(true);

  return response.body.data;
};
