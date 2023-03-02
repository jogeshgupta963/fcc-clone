import mongoose from "mongoose";
import { transform } from "typescript";
import { CourseDoc } from "../utils/types";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    duration: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "default",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

export const Course = mongoose.model<CourseDoc>("course", courseSchema);
