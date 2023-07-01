import express from "express"
import { addBasic, addEmail, addMobile } from "../controllers/userProfile.js";
import { verifyToken } from "./verifyToken.js";
const router = express.Router()

router.put("/addBasic", verifyToken, addBasic)
router.put("/addEmail", verifyToken, addEmail)
router.put("/addMobile", verifyToken, addMobile)

export default router