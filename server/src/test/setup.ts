import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { connectDb } from "../database/connection";
import request from "supertest";
import { app } from "../app";
import { basicUser, googleUser } from "../utils/types";

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  const mongo = await MongoMemoryServer.create();
  const uri: string = mongo.getUri();
  mongoServer = mongo;
  await connectDb(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  mongoServer.stop();
  await mongoose.connection.close();
});

declare global {
  // function getCookie(): Promise<string[]>;
  function createBasicUser(
    name?: string,
    password?: string,
    email?: string
  ): Promise<basicUser>;
  function createGoogleUser(
    name?: string,
    id_token?: string,
    email?: string,
    profile_pic?: string
  ): Promise<googleUser>;
}

global.createBasicUser = async (
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

global.createGoogleUser = async (
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
