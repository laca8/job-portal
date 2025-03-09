import express from "express";
import {
  applyJob,
  getAppliedJobs,
  updateStatus,
} from "../controllers/appController";
import { protect } from "../middlewares/auth";
const router = express.Router();
router.post("/:jobId", protect, applyJob);
router.get("/", protect, getAppliedJobs);
router.patch("/:id", protect, updateStatus);
export default router;
