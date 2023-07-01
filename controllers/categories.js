import { db } from "../db.js";

export const addCat = (req,res) => {

    const q = "INSERT INTO categories_table(`name`, `desc`) VALUES(?)"

    const values = [
        req.body.name,
        req.body.desc,
    ]

    db.query(q,[values], (err,data) => {
        if (err) return res.status(500).json(err);

        const newCat = {
            id : data.insertId,
            name : req.body.name,
            desc: req.body.desc,
            msg:"added successfully"
        }

        return res.status(200).json(newCat)
    })
}


export const getCat = (req,res) => {

    const q = "SELECT * FROM categories_table"

    db.query(q, (err,data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data)
    })
}