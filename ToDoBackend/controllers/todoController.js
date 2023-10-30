const db = require("../db/database.js");


//CREATE DATABASE
exports.createDB = (req, res) => {
    let q = 'CREATE DATABASE todo_db';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("DB created");
    })
}

//CREATE TABLE
exports.createTable = (req, res) => {
    let q = 'CREATE TABLE todolist(id int AUTO_INCREMENT, task VARCHAR(255), PRIMARY KEY(id))';
    db.query(q, (err, result) => {
        if (err) throw err;
        return res.status(201).json("TABLE CREATED");
    });
}


//CREATE LIST
exports.createList = (req, res) => {
    const q = "INSERT INTO todolist SET ?";

    const { task } = req.body;

    db.query(q, { task }, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
}


//SHOW TODOS
exports.showTodos = (req, res) => {
    const q = "SELECT * FROM todolist";

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json(result);
    });
};



//DELETE SINGLE TODO
exports.deleteSingleTodo = (req, res) => {

    const q = `DELETE FROM todolist  WHERE id=${req.params.id}`;

    db.query(q, (err, result) => {
        if (err) return res.json(err);
        return res.status(200).json({ data: "todo deleted" });
    });
}   