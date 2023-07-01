import { db } from "../db.js";

export const checkWishlist = (req, res) => {
    const { userId, productId } = req.query;
    const q = `SELECT EXISTS(SELECT 1 FROM wishlist_table WHERE user_id = ? AND product_id = ?) AS isExists`;
  
    db.query(q, [userId, productId], (err, data) => {
      if (err) return res.status(500).json(err);
      const exists = !!data[0].isExists;
      return res.status(200).json({ exists });
    });
  };
  