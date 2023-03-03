//basic login
import request from "supertest";
import { app } from "../../../app";

it("successfull login and get user", async () => {
  const cookie = await global.getCookie(
    "jogesh",
    "zxcvbnmm",
    "jogeshgupta963@gmail.com"
  );

  const res = await request(app)
    .post("/api/user/basic/login")
    .set("Cookie", cookie)
    .send({
      email: "jogeshgupta963@gmail.com",
      password: "zxcvbnmm",
    });
  expect(res.statusCode).toEqual(200);
  expect(res.body.success).toEqual(true);
});
