import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "branch";
  branchName?: string;
  isDeleted: boolean;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "branch"], default: "branch" },
  branchName: { type: String, default: null },
  isDeleted: { type: Boolean, default: false }
});

export default mongoose.model("User", UserSchema);
