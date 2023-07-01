import { db } from '../db.js'

export const addPost = (req,res) => {

    const q = "INSERT INTO blogs_table(`title`, `content`, `image`, `tags`, `category`, `date`, `short`) VALUES(?)"

    const values = [
        req.body.title,
        req.body.content,
        req.body.image,
        req.body.tags,
        req.body.category,
        req.body.date,
        req.body.short,
    ]

    db.query(q, [values], (err,data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("added successfully")
    })
}

export const getBlogPosts = (req, res) => {
    const category = req.query.category;
    const search = req.query.search;
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    let sql = 'SELECT * FROM blogs_table';
    let params = [];

    if (category) {
        sql += ' WHERE category = ?';
        params.push(category);
    }

    if (search) {
        sql += (category ? ' AND ' : ' WHERE ') + '(title LIKE ? OR content LIKE ? OR tags LIKE ? OR short LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    db.query(sql, params, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
}
