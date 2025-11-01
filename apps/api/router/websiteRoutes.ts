import express from "express";
import {
  createWebsite,
  getWebsites,
  getWebsiteDetails,
  toggleWebsite,
} from "../controller/websiteController";
import { authMiddleware } from "../middleware/auth"; // ✅ make sure this line exists

const router = express.Router();

// ✅ Protect all routes with the middleware
router.use(authMiddleware);

router.get("/", getWebsites);
router.get("/:id", getWebsiteDetails);
router.post("/create", createWebsite);
router.post("/toggle", authMiddleware, toggleWebsite);


export default router;
