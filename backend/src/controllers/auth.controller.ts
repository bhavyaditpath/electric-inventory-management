import { Request, Response } from "express";
import User from "../models/User";
import Branch from "../models/Branch";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user._id.toString(), user.role);

  res.json({
    message: "Login successful",
    token,
    user,
  });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role, branchId } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
    branchId: branchId || null,
  });

  // Populate branch data for response
  const populatedUser = await User.findById(user._id).select('-password').populate('branchId', 'name');

  res.json({
    message: "User created",
    user: populatedUser,
  });
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({ isDeleted: false }).select('-password').populate('branchId', 'name');
  res.json(users);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, role, branchId } = req.body;

  const user = await User.findByIdAndUpdate(id, { name, email, role, branchId }, { new: true }).select('-password').populate('branchId', 'name');
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ message: "User updated", user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ message: "User deleted" });
};
