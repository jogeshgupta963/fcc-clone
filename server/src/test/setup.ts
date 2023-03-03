import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import { basicUser, course, googleUser } from "../utils/types";
import { createBasicUser } from "./helpers/create-basic-user";
import { createGoogleUser } from "./helpers/create-google-user";
import { getCookie } from "./helpers/get-cookie";
import { createCourse } from "./helpers/create-course";
let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  // process.env.JWT_KEY = "asdfasdf";
  // process.env.PORT = "3001";
  // process.env.NODE_ENV = "dev";
  // process.env.COOKIE_NAME = "fcc";
  // process.env.JWT_SECRET = "apfmlaspkfmaipfkm";
  // process.env.JWT_EXPIRATION = "2d";
  const mongo = await MongoMemoryServer.create();
  const uri: string = mongo.getUri();
  mongoServer = mongo;
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
});

beforeEach(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.PORT = "3001";
  process.env.NODE_ENV = "dev";
  process.env.COOKIE_NAME = "fcc";
  process.env.JWT_SECRET = "apfmlaspkfmaipfkm";
  process.env.JWT_EXPIRATION = "2d";
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  mongoServer.stop();
  // (await server).close();
  await mongoose.connection.close();
});

declare global {
  function getCookie(
    name?: string,
    password?: string,
    email?: string
  ): Promise<string[]>;
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
  function createCourses(): Promise<course[]>;
}

global.createBasicUser = createBasicUser;
global.createGoogleUser = createGoogleUser;
global.getCookie = getCookie;
global.createCourses = createCourse;
