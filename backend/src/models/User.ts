import mongoose, { Document, Schema } from "mongoose";
import { UserRole, UserRole as UserRoleType } from "../constants/userRole";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRoleType;
  branchName?: string;
  isDeleted: boolean;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.branch,
  },
  branchName: { type: String, default: null },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("User", UserSchema);
