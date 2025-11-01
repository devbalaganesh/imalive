//internals packages
import websiteRoutes from "./router/websiteRoutes";
import validatorRoutes from "./router/validatorRoutes";
import userRoutes from "./router/userRoutes";
//external packages
import express from "express";
import cors from "cors";
import { authMiddleware } from "./middleware/auth";
import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";


const app = express();
app.use(clerkMiddleware());
app.use(express.json());
app.use(cors());




app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
}));
const port = parseInt(process.env.PORT!) || 5555;
app.listen(port, "0.0.0.0", () => {
  console.log("Server is running on port 5555");
});
app.get("/", (req, res) => {
  res.send("Api is alive");
});
app.use("/api/v1/website", authMiddleware, websiteRoutes);
app.use("/api/v1/validator", validatorRoutes);
app.use("/api/v1/user", userRoutes);
