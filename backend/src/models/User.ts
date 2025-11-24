import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "branch";
  branchId?: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "branch"], default: "branch" },
  branchId: { type: Schema.Types.ObjectId, ref: "Branch" }
});

export default mongoose.model("User", UserSchema);
