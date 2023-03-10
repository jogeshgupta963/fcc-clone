import { Request, Response } from "express";
import { User } from "../../../models/user";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Auth_type } from "../../../utils/types";
export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { id_token } = req.body;
    const user = await User.findOne({ id_token });

    if (!user) {
      throw new Error("Invalid Email");
      return;
    }
    if (user.auth_type === Auth_type.basic) {
      throw new Error("Login using a password");
    }
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
    return res.status(200).json({
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
