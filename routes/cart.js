import express from "express"
import { addCart, getCart, getCount, removeCart } from "../controllers/cart.js";
import { verifyToken } from "./verifyToken.js";
const router = express.Router();

router.post("/addCart",verifyToken, addCart)
router.get("/:user_id", getCart)
router.delete("/removeCart",verifyToken, removeCart)
router.get("/count/:userId",verifyToken, getCount)

export default router;