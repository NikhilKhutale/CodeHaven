import { db } from "../db.js";

export const getUserProducts = (req, res) => {
    const { sortBy, items, priceRange, sizes, colors, currentPage, input } = req.query;

    const itemsPerPage = 10;

    const offset = (currentPage - 1) * itemsPerPage;

    let sql = 'SELECT * FROM products_table WHERE 1 = 1';
    const params = [];

    if (sortBy) {
        sql += ' AND trend = ?';
        params.push(sortBy.toUpperCase());
    }

    if (items) {
        sql += ' AND `category` IN (?)';
        params.push(items);
    }

    if (priceRange) {
        const [minPrice, maxPrice] = priceRange;
        sql += ' AND `currPrice` BETWEEN ? AND ?';
        params.push(minPrice, maxPrice);
    }

    if (sizes) {
        const sizesArr = JSON.parse(sizes);
        sql += ' AND JSON_CONTAINS_ANY(`sizes`, ?)';
        params.push(sizesArr);
    }

    if (colors) {
        const colorsArr = JSON.parse(colors);
        sql += ' AND JSON_CONTAINS_ANY(`colors`, ?)';
        params.push(colorsArr);
    }

    if (input) {
        sql += ' AND (`name` LIKE ? OR `desc` LIKE ?)';
        const searchValue = `%${input}%`;
        params.push(searchValue, searchValue);
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(itemsPerPage, offset);

    db.query(sql, params, (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Error fetching products' });
        } else {
            res.json(results);
        }
    });
}
