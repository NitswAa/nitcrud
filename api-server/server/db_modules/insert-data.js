const { getClient } = require('./get-client');

module.exports.insertData = async (task_id, content, complete) => {
    client = await getClient();
    const text = `
        INSERT INTO tasks
            (task_id, content, complete)
        VALUES
            ($1, $2, $3);
    `;
    const values = [task_id, content, complete]

    const res = await client.query(text, values)
    console.log(`Inserted row with id: ${task_id} content: ${content} complete: ${complete}`);
    await client.end();
}