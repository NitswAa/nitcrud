const { getClient } = require('./get-client');

module.exports.deleteData = async (task_id) => {
    const client = await getClient();
    const text = `
        DELETE FROM tasks WHERE task_id = $1;
    `
    await client.query(text, [task_id])

    await client.end();
}