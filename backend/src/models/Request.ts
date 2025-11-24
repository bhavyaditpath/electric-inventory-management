import mongoose, { Schema, Document } from "mongoose";

export interface IRequest extends Document {
  branchId: mongoose.Types.ObjectId;
  itemId: mongoose.Types.ObjectId;
  quantity: number;
  status: "pending" | "approved" | "declined";
}

const RequestSchema = new Schema<IRequest>({
  branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
  itemId: { type: Schema.Types.ObjectId, ref: "Item" },
  quantity: Number,
  status: { type: String, enum: ["pending", "approved", "declined"], default: "pending" }
});

export default mongoose.model("Request", RequestSchema);
