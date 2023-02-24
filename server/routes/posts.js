import express from "express";
import { getFeedPosts, getUsersPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* Read */
router.get("/", verifyToken, getFeedPosts);

/* Update */ 
router.patch("/:id/likePost", verifyToken, likePost);

export default router;
