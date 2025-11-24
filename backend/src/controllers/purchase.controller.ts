import { Request, Response } from "express";
import Purchase from "../models/Purchase";
import Item from "../models/Item";

export const recordPurchase = async (req: Request, res: Response) => {
  const { itemId, quantity, cost } = req.body;

  // Increase stock
  const item = await Item.findById(itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.stock += quantity;
  await item.save();

  const purchase = await Purchase.create({
    itemId,
    quantity,
    cost,
  });

  res.json({ message: "Purchase recorded", purchase });
};

export const getPurchases = async (req: Request, res: Response) => {
  const purchases = await Purchase.find().populate("itemId");
  res.json(purchases);
};
