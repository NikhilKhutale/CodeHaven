import { db } from "../db.js"

export const addWishlist = (req, res) => {

  const q = "INSERT INTO wishlist_table (`user_id`, `product_id`) VALUES(?)"

  const values = [
    req.body.user_id,
    req.body.product_id
  ]

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err)


    return res.status(200).json("is added to wishlist successfully !")
  })
}

export const removeWishlist = (req, res) => {

  const q = "DELETE FROM wishlist_table WHERE user_id=? AND wishlist_id=?"

  db.query(q, [req.body.user_id, req.body.wishlist_id], (err, data) => {
    if (err) return res.status(500).json(err)


    return res.status(200).json("is removed from wishlist successfully !")
  })
}

export const getWishlist = (req, res) => {
  const q = `
    SELECT *
    FROM wishlist_table
    WHERE user_id = ?
  `;

  db.query(q, [req.params.user_id], (err, wishlistData) => {
    if (err) return res.status(500).json(err);

    const productIds = wishlistData.map((item) => item.product_id);

    const productQuery = `
      SELECT *
      FROM products_table
      WHERE id IN (?)
    `;

    db.query(productQuery, [productIds], (err, productData) => {
      if (err) return res.status(500).json(err);

      const combinedData = wishlistData.map((wishlistItem) => {
        const product = productData.find((productItem) => productItem.id === wishlistItem.product_id);
        return {
          ...wishlistItem,
          product: product
        };
      });

      return res.status(200).json(combinedData);
    });
  });
}

export const getCount = (req, res) => {
  const { userId } = req.params;
  const q = 'SELECT COUNT(*) AS count FROM wishlist_table WHERE user_id = ?';

  db.query(q, [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    } else {
      res.status(200).json({ count: results[0].count });
    }
  });
}