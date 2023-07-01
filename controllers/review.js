import { db } from "../db.js";

export const getReview = (req, res) => {
    const productId = req.params.id;

    const sql = `SELECT AVG(rating) AS avg_rating FROM reviews_table WHERE product_id = ?`;

    db.query(sql, productId, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching average rating' });
        } else {
            const avgRating = result[0].avg_rating || 0;
            res.status(200).json({ avgRating });
        }
    });
}

export const getAllReviews = (req, res) => {

    const q = "SELECT reviews_table.*, users_table.* FROM reviews_table JOIN users_table ON reviews_table.user_id=users_table.id WHERE reviews_table.product_id=?"

    db.query(q, [req.params.product_id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

export const addReview = (req, res) => {

    const q = "INSERT INTO reviews_table(`user_id`, `product_id`, `rating`, `comment`) VALUES(?)"

    const values = [
        req.body.user_id,
        req.body.product_id,
        req.body.rating,
        req.body.comment,
    ]

    db.query(q, [values], (err, result) => {
        if (err) return res.status(500).json(err)

        const q = "SELECT reviews_table.*, users_table.* FROM reviews_table JOIN users_table ON reviews_table.user_id=users_table.id WHERE reviews_table.review_id=?"

        db.query(q, [result.insertId], (err, data) => {
            if (err) return res.status(500).json(err)


            return res.status(200).json(data[0])
        })
    })
}

export const singleUserReview = (req, res) => {
    const q = "SELECT reviews_table.*, products_table.* FROM reviews_table JOIN products_table ON reviews_table.product_id=products_table.id WHERE reviews_table.user_id=?"

    db.query(q, [req.params.user_id], (err, data) => {
        if (err) return res.status(500).json(err)


        return res.status(200).json(data)
    })
}

export const deleteReview = (req,res) => {
    const q = "DELETE FROM reviews_table WHERE review_id= ?"

    db.query(q,[req.params.review_id], (err,data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json('The Review has been deleted.')
    })
}