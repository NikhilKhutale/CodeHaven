import express from "express"
import { featuredProducts } from "../controllers/featuredProducts.js";
const router = express.Router();

router.get("/getFeatured", featuredProducts)

export default router;