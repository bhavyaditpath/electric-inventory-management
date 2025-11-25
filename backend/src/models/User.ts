import mongoose, { Document, Schema } from "mongoose";
import { UserRole, UserRole as UserRoleType } from "../constants/userRole";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRoleType;
  branchId?: mongoose.Types.ObjectId;
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
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', default: null },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("User", UserSchema);
