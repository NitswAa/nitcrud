const { getClient } = require('./get-client');
// import getClient from './get-client';

// Returns all db entries as list of JSON
// [{"col1": "val1", "col2": "val2", ...}, ...]
module.exports.readData = async () => {
    const client = await getClient();

    const entries = await client.query('SELECT * FROM tasks;');
    // console.log(`Database entries: ${entries.rowCount} row(s)`);
    // console.log(Object.keys(entries.rows?.[0]).join('\t'));
    // console.log(`${entries.rows.map((r) => Object.values(r).join('\t')).join('\n')}`);
    // console.log(`Raw: ${JSON.stringify(entries)}`);
    await client.end();
    return entries.rows;
};