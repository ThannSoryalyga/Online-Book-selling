import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  userName: { type: String, required: true },
  phone: Number,
  age: Number,
  roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
});

export default mongoose.model("User", userSchema);
