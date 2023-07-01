import express from "express"
import { checkWishlist } from "../controllers/checkWishlist.js";
import { verifyToken } from "./verifyToken.js";

const router = express.Router()


router.get("/checkWishlist",verifyToken, checkWishlist)


export default router