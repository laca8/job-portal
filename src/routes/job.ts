import express from "express";
import {
  postJob,
  getAllJobs,
  getJobById,
  deleteJob,
} from "../controllers/jobController";
import { protect } from "../middlewares/auth";
const router = express.Router();
router.post("/", protect, postJob);
router.get("/", protect, getAllJobs);
router.get("/:id", protect, getJobById);
router.delete("/:id", protect, deleteJob);
export default router;
