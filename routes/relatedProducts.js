import express from "express"
import { relatedProducts } from "../controllers/relatedProducts.js"
const router = express.Router()

router.get('/:category', relatedProducts)

export default router