const express = require('express');
const fs = require('fs');
const database = './data/checklist.json'

const app = express();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));

const tasks = JSON.parse(fs.readFileSync(database, 'utf8'));
let nextID = tasks.length;

app.get('/api', (req, res) => {
    console.log("GET request received");

    res.json(tasks);
})


/*
    Expects a request json body containing one string under "content"
    which describes the task being added to the database

    TODO: I guess for the sake of practice, not utility,
    could add the ability for user to set 'completed' with a checkbox
    input within the form. Default to false for the sake of it being a
    'general' API practice... in some cases want other's to be able to POST
*/
app.post('/api', (req, res) => {
    console.log("POST request received");

    const task = {
        content: req.body.content,
        complete: false,
        id: nextID
    }

    nextID++;

    tasks.push(task);
    // I believe this could be done async because
    // We're dealing with a callback function and promises?
    // But anyways.
    fs.writeFileSync(database, JSON.stringify(tasks));

    // No error checking heeheehaha. Async write has callback
    // So could probably do that there.
    res.json({
        status: "Received"
    })
})

app.put('/api', (req, res) => {
    console.log("PUT request received");

    tasks[req.body.index] = {
        ...tasks[req.body.index],
        ...{ 
            content: (req.body.newContent 
                        ? req.body.newContent
                        : tasks[req.body.index].content), 
            complete: req.body.complete 
           }
    }

    fs.writeFileSync(database, JSON.stringify(tasks));

    res.json({
        status: "Received"
    })
})

app.delete('/api', (req, res) => {
    console.log("DELETE request received");

    // Okay, big question; do I want to redo all ids
    // Realistically I "should", but also in principle
    // I eventually want IDs to be randomly and safely
    // generated, for a database system. Right now IDs are
    // not used. So. It's not worth it, as it would be
    // deprecated eventually anyways, and isn't currently
    // necessary.

    // In that case, just remove the element with a splice.

    tasks = tasks.splice(req.body.index);

    fs.writeFileSync(database, JSON.stringify(tasks));

    res.json({
        status: "Received"
    })
})

