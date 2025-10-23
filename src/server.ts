import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import Role from "./models/RoleModel";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/online-book";

// Initialize roles
const initRoles = async () => {
  const roles = ["user", "admin"];
  for (const name of roles) {
    const exists = await Role.findOne({ name });
    if (!exists) await Role.create({ name });
  }
};

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await initRoles();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB error:", err));
