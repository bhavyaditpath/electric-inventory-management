import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  unit: string;
  stock: number;
  lowStockLevel: number;
  price: number;
}

const ItemSchema = new Schema<IItem>({
  name: String,
  unit: String,
  stock: Number,
  lowStockLevel: Number,
  price: Number
});

export default mongoose.model("Item", ItemSchema);
