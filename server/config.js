const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DB
} = process.env;

const config = {
    db: {
        host: 'localhost',
        user: 'root',
        password: 'Meg@mysql',
        database: 'GARAGE_SQL2',
    },
    itemsPerPage: 10,
};

module.exports = config;