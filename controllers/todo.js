import { db } from "../db.js"


export const addTodo = (req, res) => {

    const q = "INSERT INTO todo_table (`desc`) VALUES (?)";

    db.query(q, [req.body.desc], (err, result) => {
        if (err) return res.status(500).json(err);

        const newItem = {
            id: result.insertId,
            desc: req.body.desc,
            created_at: result.created_at,
            updated_at: result.updated_at,
            completed: result.completed,
            msg: 'added successfully',
          };
          return res.status(200).json(newItem);
    });
};


export const getTodo = (req,res) => {
    const q = "SELECT * FROM todo_table"

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
} 

export const deleteTodo = (req,res) => {
    const id = req.params.id;
    const q = "DELETE FROM todo_table WHERE id= ?"

    db.query(q,[id], (err,data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("Task deleted successfully")
    })
}