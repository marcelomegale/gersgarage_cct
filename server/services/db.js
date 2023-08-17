const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);

    console.log(sql, params);

    const [results, ] = await connection.execute(sql, params);

    connection.destroy();

    return results;
}

module.exports = {
    query
}