import { db } from "../db.js";

export const featuredProducts = (req,res) => {
    const q = "SELECT * FROM products_table ORDER BY RAND() LIMIT 15"

    db.query(q,(err,data) => {
        if (err) return res.status(500).json(err)


        return res.status(200).json(data)
    })
}