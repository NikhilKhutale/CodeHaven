import { db } from "../db.js"

export const addProduct = (req, res) => {
    const q = "INSERT INTO products_table(`name`,`desc`,`short`,`currPrice`,`category`,`details`,`sizes`,`colors`,`images`,`prevPrice`, `trend`) VALUES(?)"

    const values = [
        req.body.name,
        req.body.desc,
        req.body.short,
        req.body.currPrice,
        req.body.category,
        req.body.details,
        JSON.stringify(req.body.sizes),
        JSON.stringify(req.body.colors),
        JSON.stringify(req.body.images),
        req.body.prevPrice,
        req.body.sortBy,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("is added successfully !")
    })
}

export const singleProduct = (req, res) => {
    const q = "SELECT * FROM products_table where id = ?"
    db.query(q, [req.params.id], (err, data) => {
        console.log(err)
        if (err) return res.status(500).json(err)

        if (data.length === 0) {
            return res.status(404).json("Product not found")
        }

        const result = data[0]

        const product = {
            name: result.name,
            desc: result.desc,
            short: result.short,
            currPrice: result.currPrice,
            category: result.category,
            details: result.details,
            sizes: JSON.parse(result.sizes),
            colors: JSON.parse(result.colors),
            images: JSON.parse(result.images),
            prevPrice: result.prevPrice,
            trend:result.sortBy
        }

        return  res.status(200).json(product)
        
    })
}

export const updateProduct = (req, res) => {
    const q = 'UPDATE products_table SET name=?, `desc`=?, short=?, currPrice=?, category=?, details=?, sizes=?, colors=?, images=?, prevPrice=?, trend=?, updated_at=NOW() WHERE id=?';
    const values = [
        req.body.name,
        req.body.desc,
        req.body.short,
        req.body.currPrice,
        req.body.category,
        req.body.details,
        JSON.stringify(req.body.sizes),
        JSON.stringify(req.body.colors),
        JSON.stringify(req.body.images),
        req.body.prevPrice,
        req.body.sortBy,
        req.params.id,
    ];
    db.query(q, values, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json("Product updated successfully!");
    });
};

export const deleteProduct = (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM products_table WHERE id= ?"

    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("Product deleted successfully")
    })
}


export const getOlderProducts = (req,res) => {
    const q = `SELECT * FROM products_table WHERE updated_at < DATE_SUB(NOW(), INTERVAL 1 MONTH)`;

    db.query(q, (err, data) => {
        if (err) {return res.status(500).json(err)}

        return res.status(200).json(data)
    })
}