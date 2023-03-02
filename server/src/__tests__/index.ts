import request from "supertest";
import { app } from "../app";

it("test base route", () => {
  request(app).get("/").expect(200);
});
