import { ObjectId, Document } from "mongoose";

export enum Auth_type {
  google = "google",
  basic = "basic",
}
export interface UserDoc extends Document {
  name: string;
  auth_type: Auth_type;
  email: string;
  password?: string;
}
