import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../types";
import { ObjectId } from "mongoose";
import { SignOptions } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "defaultSecretKey";
const EXPIRE_TIME: any = process.env.EXPIRE_TIME || "7d";
const signToken = async (id: any) => {
  return jwt.sign({ userId: id }, JWT_SECRET as string, {
    expiresIn: EXPIRE_TIME,
  });
};
interface CustomRequest extends Request {
  user?: any;
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password, phone, role } = req.body;
  try {
    if (!name || !email || !phone || !password || !role) {
      next(new AppError("Something is missing", 400));
    }
    const user = await User.findOne({ email });
    if (user) {
      next(new AppError("user already exist please enter your email...", 400));
    }
    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      role,
    });
    const token = await signToken(newUser._id);
    const userWithNotPassword = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      profile: newUser.profile,
      token,
    };
    // console.log(token);

    res.status(201).json({
      user: userWithNotPassword,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      next(new AppError(error.message, 500));
    }
    next(new AppError("An unknown error occurred", 500));
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      next(new AppError("Something is missing", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
      next(new AppError("email or password error...", 400));
    }
    if (!user) {
      return next(new AppError("email or password error...", 400));
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      next(new AppError("email or password error...", 400));
    }
    const token = await signToken(user._id);
    // console.log(token);

    const userWithNotPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile: user.profile,
      token,
    };
    res.status(201).json({
      user: userWithNotPassword,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      next(new AppError(error.message, 500));
    }
    next(new AppError("An unknown error occurred", 500));
  }
};
export const updateProfile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user._id; // middleware authentication

    let user = await User.findById(userId);

    if (!user) {
      next(new AppError("user not found...", 500));
    }

    await User.findByIdAndUpdate({ _id: userId }, req.body, {
      new: true,
    });

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return next(new AppError(error.message, 500));
    }
    return next(new AppError("An unknown error occurred", 500));
  }
};
