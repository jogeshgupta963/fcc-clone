import { ObjectId, Document } from "mongoose";

export interface CourseDoc extends Document {
  duration: string;
  title: string;
  coverImage: string;
}
