import { Router } from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getLowStockItems
} from "../controllers/item.controller";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = Router();

// Admin only
router.post("/", protect, authorize("admin"), createItem);
router.put("/:id", protect, authorize("admin"), updateItem);
router.delete("/:id", protect, authorize("admin"), deleteItem);

// Shared (Admin + Branch)
router.get("/", protect, getAllItems);
router.get("/low-stock", protect, getLowStockItems);
router.get("/:id", protect, getItemById);

export default router;
