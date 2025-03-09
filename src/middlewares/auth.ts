import jwt from "jsonwebtoken";
import User from "../models/User";
import { AppError } from "../types";
import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
  user?: any;
}

export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  //check if token exist
  try {
    if (req.headers.authorization && req.headers.authorization) {
      token = req.headers.authorization;
    }
    if (!token) {
      return next(new AppError("please login...", 400));
    }
    //verify token
    if (!process.env.JWT_SECRET) {
      return next(new AppError("JWT secret key is not defined", 500));
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    //check if user exists
    const currentUser = await User.findById((decoded as jwt.JwtPayload).userId);
    if (!currentUser) {
      return next(new AppError("user not found", 404));
    }
    req.user = currentUser;
    // console.log(req.user);
    next();
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return next(new AppError(err.message, 500));
    }
    return next(new AppError("An unknown error occurred", 500));
  }
};
