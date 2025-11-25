import { Router } from "express";
import {
  recordSale,
  getSalesByBranch,
  getAllSales
} from "../controllers/sales.controller";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";
import { UserRole } from "../constants/userRole";
import { API_ROUTES } from "../constants/routes";

const router = Router();

// Branch users record sales
router.post(API_ROUTES.sales.base, protect, authorize(UserRole.branch, UserRole.admin), recordSale);

// Branch-specific
router.get(`${API_ROUTES.sales.branch}/:branchId`, protect, authorize(UserRole.branch, UserRole.admin), getSalesByBranch);

// Admin-only — view all sales
router.get(API_ROUTES.sales.base, protect, authorize(UserRole.admin), getAllSales);

export default router;
