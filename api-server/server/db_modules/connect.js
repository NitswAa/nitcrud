const { Client } = require('pg');
require('dotenv').config();

(async () => {
    const client = new Client({
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        ssl: false,
    });
    await client.connect();
    const res = await client.query('SELECT $1::text as connected', ['Connection to postgres successful!']);
    console.log(res.rows[0].connected);
    await client.end();
})();