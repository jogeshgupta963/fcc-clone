import { Request, Response } from "express";
import { User } from "../../../models/user";
import { Auth_type } from "../../../utils/types";
import jwt from "jsonwebtoken";
export const googleRegister = async (req: Request, res: Response) => {
  const { name, email, profile_pic, id_token } = req.body;

  try {
    const userExists = await User.find(email);
    if (userExists) throw new Error("Invalid Credentials");

    //create user
    const user = new User({
      name,
      auth_type: Auth_type.google,
      id_token,
      email,
      password: undefined,
      profile_pic,
    });

    await user.save();
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
    return res.status(201).json({
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
