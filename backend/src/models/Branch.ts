import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../constants/userRole";

export interface IBranch extends Document {
  name: string;
  address: string;
}

const BranchSchema = new Schema<IBranch>({
  name: { type: String, required: true },
  address: String
});

export default mongoose.model("Branch", BranchSchema);

