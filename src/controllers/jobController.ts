import Job from "../models/Job";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../types";
interface AuthRequest extends Request {
  user?: any;
}
// admin post  job
export const postJob = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
      positionType,
    } = req.body;
    const userId = req.user._id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !companyId ||
      !positionType
    ) {
      next(new AppError("Something error.", 400));
    }
    const job = await Job.create({
      title,
      description,
      requirements,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel,
      position,
      positionType,
      company: companyId,
      created_by: userId,
    });
    res.status(201).json({
      job,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      next(new AppError(error.message, 500));
    } else {
      next(new AppError("An unknown error occurred", 500));
    }
  }
};
// student k liye
export const getAllJobs = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      next(new AppError("not found jobs", 404));
    }
    res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      next(new AppError(error.message, 500));
    } else {
      next(new AppError("An unknown error occurred", 500));
    }
  }
};
// student
export const getJobById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      next(new AppError("jobs not found", 404));
    }
    res.status(200).json({ job, success: true });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      next(new AppError(error.message, 500));
    } else {
      next(new AppError("An unknown error occurred", 500));
    }
  }
};
export const deleteJob = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      next(new AppError("job not found...", 404));
    }
    res.status(200).json({
      message: "job deleted...",
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      next(new AppError(error.message, 500));
    } else {
      next(new AppError("An unknown error occurred", 500));
    }
  }
};
