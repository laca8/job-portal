import Company from "../models/Company";

import { NextFunction, Request, Response } from "express";
import { AppError } from "../types";
interface AuthRequest extends Request {
  user?: any;
}
export const addCompany = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description, website, logo, location } = req.body;
    const userId = req.user._id;
    if (!name) {
      next(new AppError("Company name is required.", 400));
    }
    let company = await Company.findOne({ name });
    if (company) {
      next(new AppError("Comapny name is already exist.", 400));
    }
    const newCompany = await Company.create({
      name,
      description,
      website,
      logo,
      location,
      userId,
    });

    res.status(201).json({
      company: newCompany,
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
export const getAllCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const companies = await Company.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      companies,
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

export const getMyCompanies = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user._id;
    const companies = await Company.find({ userId }).sort({ createdAt: 1 });

    res.status(200).json({
      companies,
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
// get company by id
export const getCompanyById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      next(new AppError("company not found...", 404));
    }
    res.status(200).json({
      company,
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
export const updateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!company) {
      next(new AppError("company not found...", 404));
    }
    res.status(200).json({
      company,
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
export const deleteCompany = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      next(new AppError("company not found...", 404));
    }
    res.status(200).json({
      message: "company deleted...",
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
