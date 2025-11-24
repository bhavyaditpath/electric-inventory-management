import { Router } from "express";
import {
  recordPurchase,
  getPurchases
} from "../controllers/purchase.controller";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = Router();

// Admin records purchases (restock)
router.post("/", protect, authorize("admin"), recordPurchase);

// Admin view all purchase history
router.get("/", protect, authorize("admin"), getPurchases);

export default router;
