const express = require('express');
const fs = require('fs');
const { readData } = require('./db_modules/read-data');
const { insertData } = require('./db_modules/insert-data');
const { updateData } = require('./db_modules/update-data');
const { deleteData } = require('./db_modules/delete-data');
const database = './server/data/checklist.json'

const app = express();

app.listen(3001, () => console.log('listening at 3001'));
app.use(express.static('./server/public'));
app.use(express.json({ limit: '10mb' }));

// Open up CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const tasks = JSON.parse(fs.readFileSync(database, 'utf8'));
// Wouldn't be needed with a better id generator, but works for now.
let nextID = Math.max(...tasks.map( e => e.id )) + 1; 

app.get('/api', async (req, res) => {
    console.log("GET request received");

    /* GET SQL?
        SELECT * FROM tasks;
    */
    tasks_db = await readData();

    res.json(tasks_db);
    // res.json(tasks);
})


/*
    Expects a request json body containing one string under "content"
    which describes the task being added to the database

    TODO: I guess for the sake of practice, not utility,
    could add the ability for user to set 'completed' with a checkbox
    input within the form. Default to false for the sake of it being a
    'general' API practice... in some cases want other's to be able to POST
*/
app.post('/api', async (req, res) => {
    console.log("POST request received");

    /* POST SQL?
        INSERT INTO tasks
            (task_id, content, complete)
        VALUES
            (req.body.id, req.body.content, req.body.isChecked);
    */

    // tasks.push(req.body)

    // fs.writeFileSync(database, JSON.stringify(tasks));

    // Note this is an async function; do we want to do an await?
    // The important part is that a call might be made in reference
    // to it before query resolves. In principle, at least.
    await insertData(req.body.task_id, req.body.content, req.body.complete);

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
app.put('/api', async (req, res) => {
    console.log("PUT request received");

    /* PUT SQL?
        UPDATE tasks
        SET content = req.body.content,
            complete = req.body.complete
        WHERE task_id = req.body.id;
    */

    // Realistically should always error-check 
    // Consider it from the perspective of API being public
    // const index = tasks.map( e => e.id ).indexOf(req.body.id);
    // const index = tasks.findIndex( task => task.id === req.body.id)
    
    // tasks[index] = req.body

    // fs.writeFileSync(database, JSON.stringify(tasks));
    await updateData(req.body.task_id, req.body.content, req.body.complete);

    res.json({
        status: "Received"
    })
})

app.delete('/api', async (req, res) => {
    console.log("DELETE request received");

    /* DELETE SQL?
        DELETE FROM tasks WHERE task_id = req.body.task_id;
    */

    // const index = tasks.map( e => e.id ).indexOf(req.body.id);

    // tasks.splice(index, 1);

    // fs.writeFileSync(database, JSON.stringify(tasks));

    await deleteData(req.body.task_id);

    res.json({
        status: "Received"
    })
})

// Later on would probably want a nicer generator
// Hash seeded by timestamp?
function newID() {
    return nextID++;
}