import express from "express";
import {
  addCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyById,
  getMyCompanies,
  updateCompany,
} from "../controllers/companyController";
import { protect } from "../middlewares/auth";
const router = express.Router();
router.post("/", protect, addCompany);
router.get("/", protect, getAllCompanies);
router.get("/me", protect, getMyCompanies);
router.get("/:id", protect, getCompanyById);
router.patch("/:id", protect, updateCompany);
router.delete("/:id", protect, deleteCompany);
export default router;
