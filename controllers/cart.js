import { db } from "../db.js";

export const addCart = (req, res) => {

    const q = 'SELECT * FROM cart_table WHERE user_id = ? AND product_id = ? AND quantity = ? AND size = ? AND color = ?'


    db.query(q, [req.body.user_id, req.body.product_id, req.body.quantity, req.body.size, req.body.color], (err, data) => {
        if (err) return res.status(500).json(err)

        if (data.length) return res.status(200).json(`Product is already in the cart with size ${req.body.size} and color ${req.body.color.name}`)

        const q = "INSERT INTO cart_table(`user_id`, `product_id`, `quantity`, `size`, `color`) VALUES(?)"

        const values = [
            req.body.user_id,
            req.body.product_id,
            req.body.quantity,
            req.body.size,
            req.body.color
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)


            return res.status(200).json("is added to cart successfully !")
        })
    })
}

export const getCart = (req, res) => {
    const q = "SELECT * FROM cart_table WHERE user_id = ?";

    db.query(q, [req.params.user_id], (err, cartData) => {
        if (err) return res.status(500).json(err);

        const productIds = cartData.map(item => item.product_id);
        const productQuery = "SELECT * FROM products_table WHERE id IN (?)";

        db.query(productQuery, [productIds], (err, productData) => {
            if (err) return res.status(500).json(err);

            const mergedData = cartData.map(cartItem => {
                const product = productData.find(item => item.id === cartItem.product_id);
                return { ...cartItem, ...product };
            });

            return res.status(200).json(mergedData);
        });
    });
};


export const removeCart = (req, res) => {

    const q = "DELETE FROM cart_table WHERE user_id=? AND product_id=? AND quantity=? AND color=? AND size=?"

    db.query(q, [req.body.user_id, req.body.product_id, req.body.quantity, req.body.color, req.body.size], (err, data) => {
        if (err) return res.status(500).json(err)


        return res.status(200).json("Your item has been removed from cart successfully !")
    })
}

export const getCount = (req, res) => {
    const { userId } = req.params;
    const q = 'SELECT COUNT(*) AS count FROM cart_table WHERE user_id = ?';

    db.query(q, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        } else {
            res.status(200).json({ count: results[0].count });
        }
    });
}

