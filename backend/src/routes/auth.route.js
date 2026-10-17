import express from "express";
import { checkAuth } from "../controllers/auth.controller.js";
import { protectRouteas } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/check", protectRoute, checkAuth);

export default router;