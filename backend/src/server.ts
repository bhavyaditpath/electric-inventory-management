import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import itemRoutes from "./routes/item.routes";
import salesRoutes from "./routes/sales.routes";
import purchaseRoutes from "./routes/purchase.routes";
import requestRoutes from "./routes/request.routes";
import branchRoutes from "./routes/branch.routes";
import { seedAdmin } from "./config/seedAdmin";
// Import models to register them
import "./models/User";
import "./models/Item";
import "./models/Branch";
import "./models/Purchase";
import "./models/Sales";
import "./models/Request";

dotenv.config();
connectDB().then(seedAdmin);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/branches", branchRoutes);

app.get("/", (_, res) => res.send("Electric Inventory API Running"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
