import express from "express"
import { addCat, getCat } from "../controllers/categories.js"
import { verifyToken } from "./verifyToken.js"

const router = express.Router()

router.post("/addCat", verifyToken, addCat)
router.get("/getCat", verifyToken, getCat)

export default router;