import { Router } from "express";
import {
  createRequest,
  getBranchRequests,
  getAllRequests,
  approveRequest,
  declineRequest
} from "../controllers/request.controller";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = Router();

// Branch creates request
router.post("/", protect, authorize("branch"), createRequest);

// Branch checks their own requests
router.get("/my", protect, authorize("branch"), getBranchRequests);

// Admin gets all requests across branches
router.get("/", protect, authorize("admin"), getAllRequests);

// Admin approve/decline
router.put("/approve/:id", protect, authorize("admin"), approveRequest);
router.put("/decline/:id", protect, authorize("admin"), declineRequest);

export default router;
