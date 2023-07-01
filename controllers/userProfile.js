import { db } from '../db.js'

export const addBasic = (req,res) => {
    const q = 'UPDATE users_table SET fname=?, lname=?, gender=? WHERE id=?'

    db.query(q,[req.body.fname, req.body.lname, req.body.gender, req.body.user_id], (err,data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("Information updated successfully")
    })
}

export const addEmail = (req,res) => {
    const q = 'UPDATE users_table SET email=? WHERE id=?'

    db.query(q,[req.body.email, req.body.user_id], (err,data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("Email updated successfully")
    })
}

export const addMobile = (req,res) => {
    const q = 'UPDATE users_table SET mobileNo=? WHERE id=?'

    db.query(q,[req.body.mobileNo, req.body.user_id], (err,data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("mobile No updated successfully")
    })
}