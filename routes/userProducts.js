import express from "express"
import { getUserProducts } from "../controllers/userProducts.js"
const router = express.Router()

router.get('/', getUserProducts)

export default router