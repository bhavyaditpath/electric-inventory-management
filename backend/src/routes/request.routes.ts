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
import { UserRole } from "../constants/userRole";
import { API_ROUTES } from "../constants/routes";

const router = Router();

// Branch creates request
router.post(API_ROUTES.requests.base, protect, authorize(UserRole.branch), createRequest);

// Branch checks their own requests
router.get(API_ROUTES.requests.my, protect, authorize(UserRole.branch), getBranchRequests);

// Admin gets all requests across branches
router.get(API_ROUTES.requests.base, protect, authorize(UserRole.admin), getAllRequests);

// Admin approve/decline
router.put(`${API_ROUTES.requests.approve}/:id`, protect, authorize(UserRole.admin), approveRequest);
router.put(`${API_ROUTES.requests.decline}/:id`, protect, authorize(UserRole.admin), declineRequest);

export default router;
