import { Router } from "express";
import {
  recordSale,
  getSalesByBranch,
  getAllSales
} from "../controllers/sales.controller";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = Router();

// Branch users record sales
router.post("/", protect, authorize("branch", "admin"), recordSale);

// Branch-specific
router.get("/branch/:branchId", protect, authorize("branch", "admin"), getSalesByBranch);

// Admin-only — view all sales
router.get("/", protect, authorize("admin"), getAllSales);

export default router;
