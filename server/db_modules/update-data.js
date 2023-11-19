const { getClient } = require('./get-client');

module.exports.updateData = async (task_id, content, complete) => {
    const client = await getClient();
    const text = `
        UPDATE tasks
        SET content = $2,
            complete = $3
        WHERE task_id = $1;
    `
    await client.query(text, [task_id, content, complete]);
    
    console.log(`Updated row with id: ${task_id} to content: ${content}; and complete: ${complete}`)
    await client.end();
}