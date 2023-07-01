import { db } from "../db.js";

export const addCoupon = (req, res) => {

    const q = "INSERT INTO coupons_table(`code`, `percentage`, `info`, `tc`, `expairy_date`) VALUES(?)"

    const values = [
        req.body.code,
        req.body.percentage,
        req.body.info,
        req.body.tc,
        req.body.expairy_date,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)

        const newCoupon = {
            id: data.insertId,
            code: req.body.code,
            percentage: req.body.percentage,
            info: req.body.info,
            tc: req.body.tc,
            expairy_date: req.body.expairy_date,
            msg:"added successfully"
        }

        return res.status(200).json(newCoupon)
    })
}

export const getCoupons = (req,res) => {

    const q = "SELECT * FROM coupons_table"

    db.query(q, (err,data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

export const deleteCoupons = (req,res) => {

    const q = "DELETE FROM coupons_table WHERE id= ?"

    db.query(q,[req.params.id], (err,data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("Coupon deleted successfully")
    })
}

export const singleCoupon = (req,res) => {
    const q = "SELECT percentage FROM coupons_table WHERE code = ?"

    db.query(q, [req.query.code], (err, data) => {
        if (err) return res.status(500).json(err)

        

        else if (data.length === 0) { return res.status(200).json(null)}

        else { return res.status(200).json(data[0])}
    })
}