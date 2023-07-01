import { db } from "../db.js";

export const addAddress = (req, res) => {
    const query = `
      INSERT INTO address_table (user_id, firstName, lastName, country, address1, address2, townCity, province, postCode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        req.body.user_id,
        req.body.firstName,
        req.body.lastName,
        req.body.country,
        req.body.address1,
        req.body.address2,
        req.body.townCity,
        req.body.province,
        req.body.postCode
    ];

    db.query(query, params, (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("Address inserted successfully.")
    });
}


export const deleteAddress = (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM address_table WHERE address_id= ?"

    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("Task deleted successfully")
    })
}

export const getAllAddress = (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM address_table WHERE user_id=?"

    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}