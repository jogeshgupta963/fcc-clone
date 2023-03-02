import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routes/user";
export const app = express();

//configs
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: "running...",
  });
});
app.use("/api/user/", userRouter);
app.all("*", async (req: Request, res: Response) => {
  res.json("Not Found");
});
