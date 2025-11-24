import mongoose, { Schema, Document } from "mongoose";

export interface IPurchase extends Document {
  itemId: mongoose.Types.ObjectId;
  quantity: number;
  cost: number;
}

const PurchaseSchema = new Schema<IPurchase>({
  itemId: { type: Schema.Types.ObjectId, ref: "Item" },
  quantity: Number,
  cost: Number
});

export default mongoose.model("Purchase", PurchaseSchema);
