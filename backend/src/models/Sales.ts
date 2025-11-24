import mongoose, { Schema, Document } from "mongoose";

export interface ISales extends Document {
  branchId: mongoose.Types.ObjectId;
  itemsSold: { itemId: mongoose.Types.ObjectId; quantity: number }[];
  totalAmount: number;
  date: Date;
}

const SalesSchema = new Schema<ISales>({
  branchId: { type: Schema.Types.ObjectId, ref: "Branch" },
  itemsSold: [
    {
      itemId: { type: Schema.Types.ObjectId, ref: "Item" },
      quantity: Number
    }
  ],
  totalAmount: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Sales", SalesSchema);
