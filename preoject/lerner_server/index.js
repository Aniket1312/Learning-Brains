
const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Ani13mishra",
    database: "user_database"
});

app.post('/register', (req,res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO user (name, username, password) VALUES(?, ?, ?) ", [name, username, password], (err, result) => {
        console.log(err);
    });
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM user WHERE username = ? AND password = ? ", [username, password], (err, result) => {
        if(err){
            res.send({err: err})
        }

        if(result.length > 0){
            res.send(result)
        }else{
            res.send({message: "Wrong username and password."})
        }
    });
})

app.post('/enroll-now', (req, res) => {
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;


    db.query("INSERT INTO courses (user_id, title, description) VALUES(?, ?, ?)  ", [user_id, title, description], (err, result) => {
        if(err){
            res.send({err: err})
        }else{
            res.send({message: "Record added sccessfullly!"});
        }
    });
})

app.post('/enrolled-courses', (req, res) => {
    const user_id = req.body.user_id;


    db.query("SELECT * FROM courses WHERE user_id = ? ", [user_id], (err, result) => {
        if(err){
            res.send({err: err})
        }else{
            res.send({result});
        }
    });
})


app.listen(3002, () => {
    console.log("Server running!")
});