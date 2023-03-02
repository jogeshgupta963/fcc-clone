import mongoose from "mongoose";
import { transform } from "typescript";
import { Auth_type, UserDoc } from "../utils/types";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    auth_type: {
      enum: Auth_type,
      default: Auth_type.basic,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
    },
    profile_pic: {
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

export const User = mongoose.model<UserDoc>("user", userSchema);
