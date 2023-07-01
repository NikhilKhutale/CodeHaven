import express from "express"
import { addOrders, adminOrders, placeOrder, userOrders } from "../controllers/order.js";
import { verifyToken } from "./verifyToken.js";
const router = express.Router()

router.put("/addOrders", verifyToken, addOrders)
router.get("/userOrders/:user_id", verifyToken, userOrders)
router.get("/adminOrders", adminOrders)
router.post('/placeOrder', placeOrder);

export default router