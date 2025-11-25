import { Request, Response } from "express";
import User from "../models/User";
import Branch from "../models/Branch";
import bcrypt from "bcryptjs";
import crypto from "crypto";
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

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email, isDeleted: false });
  if (!user) return res.status(404).json({ message: "User not found" });

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Save reset token to user (in a real app, you'd hash this)
  user.resetToken = resetToken;
  user.resetTokenExpiry = resetTokenExpiry;
  await user.save();

  // In a real application, you would send an email here
  // For demo purposes, we'll just return success
  console.log(`Password reset token for ${email}: ${resetToken}`);

  res.json({
    message: "Password reset link sent to your email",
    // In production, don't send the token in response
    resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: new Date() },
    isDeleted: false
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired reset token" });

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: "Password reset successfully" });
};
