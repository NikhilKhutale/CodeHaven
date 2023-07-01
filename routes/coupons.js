import express from "express"
import { addCoupon, deleteCoupons, getCoupons, singleCoupon } from "../controllers/coupons.js";
import { verifyToken } from "./verifyToken.js";


const router = express.Router();

router.post("/addCoupon", verifyToken, addCoupon)
router.get("/getCoupon", verifyToken, getCoupons)
router.delete("/:id", verifyToken, deleteCoupons)
router.get("/singleCoupon", singleCoupon)

export default router;