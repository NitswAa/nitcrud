const { getClient } = require('./get-client');

module.exports.readData = async () => {
    const client = await getClient();

    const task_table = await client.query('SELECT * FROM tasks;');

    await client.end();
    return task_table.rows;
};