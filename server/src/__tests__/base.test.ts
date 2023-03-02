import request from "supertest";
import { app } from "../app";

it("test base route", async () => {
  const response = await request(app).get("/").expect(200);
});
