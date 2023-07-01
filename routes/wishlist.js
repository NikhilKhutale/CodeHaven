import express from "express"
import { addWishlist, getCount, getWishlist, removeWishlist } from "../controllers/wishlist.js"
import { verifyToken } from "./verifyToken.js";

const router = express.Router()

router.post("/addWishlist", addWishlist)
router.get("/:user_id",verifyToken, getWishlist)
router.delete("/removeWishlist",verifyToken, removeWishlist)
router.get("/count/:userId",verifyToken, getCount)

export default router