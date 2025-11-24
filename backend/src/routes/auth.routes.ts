import { Router } from "express";
import { login, register, getUsers, updateUser, deleteUser } from "../controllers/auth.controller";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";

const router = Router();

// Public
router.post("/login", login);

// Admin can create users (branch users)
router.post("/register", protect, authorize("admin"), register);

// Admin can view all users
router.get("/users", protect, authorize("admin"), getUsers);

// Admin can update users
router.put("/users/:id", protect, authorize("admin"), updateUser);

// Admin can soft delete users
router.delete("/users/:id", protect, authorize("admin"), deleteUser);

export default router;
