import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { connectDb } from "../database/connection";

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
