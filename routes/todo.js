import express from "express";
import { addTodo, getTodo, deleteTodo } from "../controllers/todo.js";
import { verifyToken } from "./verifyToken.js";

const router = express.Router()

router.post('/addTask', verifyToken, addTodo)
router.get('/getTask', verifyToken, getTodo)
router.delete('/:id', verifyToken, deleteTodo)


export default router;