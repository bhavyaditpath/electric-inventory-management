import { Request, Response } from "express";
import Branch from "../models/Branch";

export const getAllBranches = async (req: Request, res: Response) => {
  const branches = await Branch.find();
  res.json(branches);
};

export const createBranch = async (req: Request, res: Response) => {
  const branch = await Branch.create(req.body);
  res.json({ message: "Branch created", branch });
};

export const updateBranch = async (req: Request, res: Response) => {
  const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!branch) return res.status(404).json({ message: "Branch not found" });
  res.json({ message: "Branch updated", branch });
};

export const deleteBranch = async (req: Request, res: Response) => {
  const branch = await Branch.findByIdAndDelete(req.params.id);
  if (!branch) return res.status(404).json({ message: "Branch not found" });
  res.json({ message: "Branch deleted" });
};