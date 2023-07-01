import express from "express";
import { addReview, deleteReview, getAllReviews, getReview, singleUserReview } from "../controllers/review.js";
import { verifyToken } from "./verifyToken.js";

const router = express.Router()

router.get("/reviews/:id", verifyToken, getReview)
router.get("/:product_id", getAllReviews)
router.post("/addReview", verifyToken, addReview)
router.get("/singleUserReview/:user_id", verifyToken, singleUserReview)
router.delete("/deleteReview/:review_id", verifyToken, deleteReview)

export default router;