import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = Router();

// Public
router.post("/login", login);

// Admin can create users (branch users)
router.post("/register", protect, authorize("admin"), register);

export default router;
