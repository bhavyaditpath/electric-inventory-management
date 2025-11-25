import { Router } from "express";
import { login, register, getUsers, updateUser, deleteUser } from "../controllers/auth.controller";
import { protect } from "../middlewares/authMiddleware";
import { authorize } from "../middlewares/roleMiddleware";
import { UserRole } from "../constants/userRole";
import { API_ROUTES } from "../constants/routes";

const router = Router();

// Public
router.post(API_ROUTES.auth.login, login);

// Admin can create users (branch users)
router.post(API_ROUTES.auth.register, protect, authorize(UserRole.admin), register);

// Admin can view all users
router.get(API_ROUTES.auth.users, protect, authorize(UserRole.admin), getUsers);

// Admin can update users
router.put(`${API_ROUTES.auth.users}/:id`, protect, authorize(UserRole.admin), updateUser);

// Admin can soft delete users
router.delete(`${API_ROUTES.auth.users}/:id`, protect, authorize(UserRole.admin), deleteUser);

export default router;
