import express from "express"
import { addPost, getBlogPosts } from "../controllers/blogs.js";
import { verifyToken } from "./verifyToken.js";

const router = express.Router();

router.post("/addPost", verifyToken, addPost)
router.get("/getBlogPosts", getBlogPosts)

export default router;