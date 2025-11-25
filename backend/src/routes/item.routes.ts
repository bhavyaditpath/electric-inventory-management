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
import { UserRole } from "../constants/userRole";
import { API_ROUTES } from "../constants/routes";

const router = Router();

// Admin only
router.post(API_ROUTES.items.base, protect, authorize(UserRole.admin), createItem);
router.put(`${API_ROUTES.items.base}:id`, protect, authorize(UserRole.admin), updateItem);
router.delete(`${API_ROUTES.items.base}:id`, protect, authorize(UserRole.admin), deleteItem);

// Shared (Admin + Branch)
router.get(API_ROUTES.items.base, protect, getAllItems);
router.get(API_ROUTES.items.lowStock, protect, getLowStockItems);
router.get(`${API_ROUTES.items.base}:id`, protect, getItemById);

export default router;
