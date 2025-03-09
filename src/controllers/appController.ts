import Application from "../models/Application";
import Job from "../models/Job";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../types";
interface AuthRequest extends Request {
  user?: any;
}
export const applyJob = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user._id;
    const jobId = req.params.jobId;
    if (!jobId) {
      next(new AppError("job id required...", 400));
    }
    // check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      next(new AppError("You have already applied for this jobs", 400));
    }

    // check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
      next(new AppError("job not found...", 400));
    }
    // create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    res.status(201).json({
      message: "Job applied successfully.",
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
export const getAppliedJobs = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user._id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!applications) {
      next(new AppError("No applications...", 500));
    }
    res.status(200).json({
      applications,
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

export const updateStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      next(new AppError("status required", 500));
    }

    // find the application by applicantion id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      next(new AppError("application not found", 500));
    }
    await Application.findById({ _id: applicationId }, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Status updated successfully.",
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
