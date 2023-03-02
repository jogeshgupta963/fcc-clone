import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
export const app = express();

//configs
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.all("*", async (req: Request, res: Response) => {
  res.json("Not Found");
});
