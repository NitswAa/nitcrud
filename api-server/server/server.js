const express = require('express');
const fs = require('fs');
const { readData } = require('./db_modules/read-data');
const { insertData } = require('./db_modules/insert-data');
const { updateData } = require('./db_modules/update-data');
const { deleteData } = require('./db_modules/delete-data');
require('dotenv').config();

const app = express();

app.listen(3001, () => console.log('listening at 3001'));
app.use(express.static('./server/public'));
app.use(express.json({ limit: '10mb' }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api', async (req, res) => {
    console.log("GET request received");

    tasks = await readData();

    res.json(tasks);
})

app.post('/api', async (req, res) => {
    console.log("POST request received");

    await insertData(req.body.task_id, req.body.content, req.body.complete);

    res.json({
        status: "Received"
    })
})

app.put('/api', async (req, res) => {
    console.log("PUT request received");

    await updateData(req.body.task_id, req.body.content, req.body.complete);

    res.json({
        status: "Received"
    })
})

app.delete('/api', async (req, res) => {
    console.log("DELETE request received");

    await deleteData(req.body.task_id);

    res.json({
        status: "Received"
    })
})