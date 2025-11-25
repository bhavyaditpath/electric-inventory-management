import { Router } from "express";
import { getAllBranches, createBranch, updateBranch, deleteBranch } from "../controllers/branch.controller";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";
import { API_ROUTES } from "../constants/routes";
import { UserRole } from "../constants/userRole";

const router = Router();

// Admin only
router.post(API_ROUTES.branches.base, protect, authorize(UserRole.admin), createBranch);
router.put(`${API_ROUTES.branches.base}/:id`, protect, authorize(UserRole.admin), updateBranch);
router.delete(`${API_ROUTES.branches.base}/:id`, protect, authorize(UserRole.admin), deleteBranch);

// All authenticated users
router.get(API_ROUTES.branches.base, protect, getAllBranches);

export default router;