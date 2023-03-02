import { Request, Response } from "express";
import { User } from "../../../models/user";
import { Auth_type } from "../../../utils/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const basicRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("Email Id already exists");
    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user
    const user = new User({
      name,
      auth_type: Auth_type.basic,
      id_token: undefined,
      email,
      password: hashedPassword,
      profile_pic: req.body.profile_pic,
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
