const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser')

const app = express()
const port = 3200

app.use(bodyParser.json())

app.get('/', getUsers);
app.post('/', addUser);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

function getUsers(req, res) {

    fs.readFile(__dirname + "/users.json", 'utf-8', (err, data) => {
        console.log(data)
        res.send(JSON.stringify(data))
    })
}

function addUser(req, res) {
    fs.readFile(__dirname + "/users.json", 'utf-8', (err, data) => {
        data = JSON.parse(data)
        data.users.push(req.body)
        data = JSON.stringify(data)
        fs.writeFile(__dirname + "/users.json", data, (err) => {
            if (err) return res.send("oopsie")
            res.send(data)
        })
        
    })
    // res.send("thanks for posting " + JSON.stringify(req.body))
}