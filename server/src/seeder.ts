import mongoose from "mongoose";
import "dotenv/config";
import { connectDb } from "./database/connection";
import { User } from "./models/user";
import { Course } from "./models/courses";
import { courses } from "./data/courses";

const connection = async () => await connectDb(process.env.MONGO_URI!);
connection();
async function importData() {
  try {
    console.log(courses);
    await User.deleteMany();
    await Course.deleteMany();

    await Course.insertMany(courses);
    console.log("data imported");
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    process.exit(1);
  }
}
async function destroyData() {
  try {
    await User.deleteMany();
    await Course.deleteMany();

    console.log("data destroyed");
    process.exit(0);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    process.exit(1);
  }
}

process.argv[2] === "-d" ? destroyData() : importData();
