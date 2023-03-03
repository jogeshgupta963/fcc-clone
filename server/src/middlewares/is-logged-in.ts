import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { MongooseError } from "mongoose";
import { User } from "../models/user";
import { Auth_type } from "../utils/types";

interface Payload {
  id: string;
}
interface UserPayload {
  name: string;
  auth_type: Auth_type;
  email: string;
  password?: string;
  id_token?: string;
  profile_pic?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  // fetching cookie
  const decoded = req.cookies[process.env.COOKIE_NAME!];

  if (!decoded) {
    throw new Error("NOT AUTHORISED");
  }
  try {
    const payload = jwt.verify(decoded, process.env.JWT_SECRET!) as Payload;
    //fetch user

    const user = (await User.findById(payload.id)) as UserPayload;
    req.user = user;
  } catch (err) {
    if (err instanceof MongooseError) {
      return res.json("Server error");
    }
    if (err instanceof Error) {
      return res.json(err.message);
    }
    return res.json("Something went wrong!!");
  }
  next();
}

export { isLoggedIn };
