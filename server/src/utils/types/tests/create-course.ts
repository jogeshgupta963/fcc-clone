import { ObjectId } from "mongoose";

export interface course {
  title: string;
  duration: string;
  coverImage: string;
  _id: ObjectId;
}
