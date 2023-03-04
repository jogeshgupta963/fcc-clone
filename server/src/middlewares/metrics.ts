import { Request, Response } from "express";
import responseTime from "response-time";
import { resTimeHist } from "../metrics/metrics";

export const resTime = (req: Request, res: Response, time: number) => {
  if (req?.route?.path) {
    resTimeHist.observe(
      {
        method: req.method,
        route: req.route.path,
        status_code: res.statusCode,
      },
      time * 1000
    );
  }
};
