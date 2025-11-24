import { Request, Response } from "express";
import Item from "../models/Item";

export const createItem = async (req: Request, res: Response) => {
  const item = await Item.create(req.body);
  res.json({ message: "Item created", item });
};

export const getAllItems = async (req: Request, res: Response) => {
  const items = await Item.find();
  res.json(items);
};

export const getItemById = async (req: Request, res: Response) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
};

export const updateItem = async (req: Request, res: Response) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item updated", item });
};

export const deleteItem = async (req: Request, res: Response) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item deleted" });
};

// Low stock items
export const getLowStockItems = async (req: Request, res: Response) => {
  const items = await Item.find({ $expr: { $lte: ["$stock", "$lowStockLevel"] } });
  res.json(items);
};
