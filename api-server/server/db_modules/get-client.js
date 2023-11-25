const { Client } = require('pg');
require('dotenv').config();

/* Remember to end client after use! */
/* 
    Neat little trick for the potential future: 
   have the function take a lambda for code
   that is to be executed with this client;
   then end client in this function after
   execution
*/
module.exports.getClient = async () => {
    const client = new Client({
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        ssl: false,
    })
    await client.connect();
    return client;
};
