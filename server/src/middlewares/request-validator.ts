import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

function requestValidator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      data: errors.array(),
    });
  }
  next();
}

export { requestValidator };
