import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
  name: { type: String, required: true },
  permissions: [String],
});

export default mongoose.model("Role", roleSchema);
