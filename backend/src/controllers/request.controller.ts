import { Request, Response } from "express";
import RequestModel from "../models/Request";
import Item from "../models/Item";

export const createRequest = async (req: any, res: Response) => {
  const { itemId, quantity } = req.body;

  const request = await RequestModel.create({
    branchId: req.user.branchId,
    itemId,
    quantity,
    status: "pending",
  });

  res.json({ message: "Request created", request });
};

export const getBranchRequests = async (req: any, res: Response) => {
  const requests = await RequestModel.find({ branchId: req.user.branchId }).populate("itemId");
  res.json(requests);
};

export const getAllRequests = async (req: Request, res: Response) => {
  const requests = await RequestModel.find().populate("itemId branchId");
  res.json(requests);
};

export const approveRequest = async (req: Request, res: Response) => {
  const request = await RequestModel.findById(req.params.id);
  if (!request) return res.status(404).json({ message: "Request not found" });

  const item = await Item.findById(request.itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });

  if (item.stock < request.quantity)
    return res.status(400).json({ message: "Not enough stock" });

  // Deduct stock
  item.stock -= request.quantity;
  await item.save();

  request.status = "approved";
  await request.save();

  res.json({ message: "Request approved", request });
};

export const declineRequest = async (req: Request, res: Response) => {
  const request = await RequestModel.findById(req.params.id);
  if (!request) return res.status(404).json({ message: "Request not found" });

  request.status = "declined";
  await request.save();

  res.json({ message: "Request declined", request });
};
