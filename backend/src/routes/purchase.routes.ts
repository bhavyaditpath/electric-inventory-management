import { Router } from "express";
import {
  recordPurchase,
  getPurchases
} from "../controllers/purchase.controller";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";
import { UserRole } from "../constants/userRole";
import { API_ROUTES } from "../constants/routes";

const router = Router();

// Admin records purchases (restock)
router.post(API_ROUTES.purchases.base, protect, authorize(UserRole.admin), recordPurchase);

// Admin view all purchase history
router.get(API_ROUTES.purchases.base, protect, authorize(UserRole.admin), getPurchases);

export default router;
