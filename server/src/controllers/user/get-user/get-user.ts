import { Request, Response } from "express";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      data: req.user!,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        data: err.message,
      });
    }
  }
};
