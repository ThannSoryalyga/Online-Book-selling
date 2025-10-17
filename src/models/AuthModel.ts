import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roleId: { type: Types.ObjectId, ref: "Role", required: true },
    phone: { type: Number, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
