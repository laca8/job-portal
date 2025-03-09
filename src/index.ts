import express, { Request, Response, Express, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { globalErrorHandler } from "./middlewares/errorHandler";
import { AppError } from "./types";
import userRoute from "./routes/user";
import companyRoute from "./routes/company";
import jobRoute from "./routes/job";
import appRoute from "./routes/application";
dotenv.config();
const app: Express = express();
app.use(express.json());
connectDB();
//routes
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/app", appRoute);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
