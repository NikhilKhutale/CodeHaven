import { db } from "../db.js";

export const relatedProducts = (req,res) => {
    const q = "SELECT * FROM products_table WHERE category = ? LIMIT 8"

    db.query(q, [req.params.category],(err,data) => {
        if (err) return res.status(500).json(err)


        return res.status(200).json(data)
    })
}