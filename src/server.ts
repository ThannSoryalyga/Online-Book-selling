import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import Role from "./models/RoleModel";
import authRoutes from "./routes/authRoutes";
import orderItemRoutes from "./routes/orderitemRoutes";

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/order-items", orderItemRoutes);

const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/online-book";

// MongoDB connect + create roles
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");
    const roles = ["user", "admin"];
    for (let name of roles) {
      const exists = await Role.findOne({ name });
      if (!exists) await Role.create({ name });
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB error:", err));
