const express = require('express');
const fs = require('fs');
const database = './data/checklist.json'

const app = express();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));

const tasks = JSON.parse(fs.readFileSync(database, 'utf8'));
// Wouldn't be needed with a better id generator, but works for now.
let nextID = Math.max(...tasks.map( e => e.id )) + 1; 

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
        id: newID()
    }

    tasks.push(task);
    // I believe this could/should be done async esp. because
    // We're dealing with a callback function and promises?
    fs.writeFileSync(database, JSON.stringify(tasks));

    // No error checking heeheehaha. Async write has callback
    // So could probably do that there.
    res.json({
        status: "Received"
    })
})


/*
    Expects a request with newContent, complete, and id properties
    within the body, to replace a piece of content with something
    else and/or mark it as completed.
*/
app.put('/api', (req, res) => {
    console.log("PUT request received");

    const index = tasks.map( e => e.id ).indexOf(req.body.id);

    tasks[index] = {
        ...tasks[index],
        ...{ 
            content: (req.body.newContent 
                        ? req.body.newContent
                        : tasks[index].content), 
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

    const index = tasks.map( e => e.id ).indexOf(req.body.id);

    tasks.splice(index, 1);

    fs.writeFileSync(database, JSON.stringify(tasks));

    res.json({
        status: "Received"
    })
})

// Later on would probably want a nicer generator
// Hash seeded by timestamp?
function newID() {
    return nextID++;
}