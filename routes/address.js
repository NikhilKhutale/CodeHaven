import express from "express"
import { addAddress, deleteAddress, getAllAddress } from "../controllers/address.js";
import { verifyToken } from "./verifyToken.js";
const router = express.Router();

router.post("/addAddress", verifyToken, addAddress)
router.delete("/:id", verifyToken, deleteAddress)
router.get("/allAddress/:id", verifyToken, getAllAddress)

export default router;