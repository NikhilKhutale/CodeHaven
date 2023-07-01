import express from "express"
import { addProduct, singleProduct, updateProduct, deleteProduct, getOlderProducts } from "../controllers/products.js"
import { verifyToken } from "./verifyToken.js"

const router = express.Router()

router.post("/addProduct", verifyToken, addProduct)
router.get("/:id", verifyToken, singleProduct)
router.put("/:id", verifyToken, updateProduct)
router.delete("/:id", verifyToken, deleteProduct)
router.get("/", verifyToken, getOlderProducts)


export default router