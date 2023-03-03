import { Request, Response } from "express";
import { User } from "../../../models/user";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { Auth_type } from "../../../utils/types";
export const basicLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email not found");
      return;
    }
    if (user.auth_type == Auth_type.google) {
      throw new Error("Login with google");
    }
    //check password
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) throw new Error("Invalid Credentials");
    //jwt
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRATION!,
      }
    );
    res.cookie(process.env.COOKIE_NAME!, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV! === "prod",
    });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        success: false,
        data: err.message,
      });
    }
  }
};
