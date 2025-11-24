import { Request, Response } from "express";
import Sales from "../models/Sales";
import Item from "../models/Item";

export const recordSale = async (req: Request, res: Response) => {
  const { branchId, itemsSold, totalAmount } = req.body;

  // Deduct stock
  for (const sold of itemsSold) {
    const item = await Item.findById(sold.itemId);
    if (!item) continue;
    item.stock -= sold.quantity;
    await item.save();
  }

  const sale = await Sales.create({
    branchId,
    itemsSold,
    totalAmount,
    date: new Date(),
  });

  res.json({ message: "Sale recorded", sale });
};

export const getSalesByBranch = async (req: Request, res: Response) => {
  const sales = await Sales.find({ branchId: req.params.branchId }).populate("itemsSold.itemId");
  res.json(sales);
};

export const getAllSales = async (req: Request, res: Response) => {
  const sales = await Sales.find().populate("itemsSold.itemId");
  res.json(sales);
};
