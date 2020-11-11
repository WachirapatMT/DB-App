module.exports = {
    MongoDB: {
        CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
    },
    MySQL: {
        HOST: process.env.MYSQL_HOST || 'localhost',
        PORT: process.env.MYSQL_PORT || 3306,
        USER: process.env.MYSQL_USER || 'root',
        PASS: process.env.MYSQL_PASS || 'password',
        DATABASE: process.env.MYSQL_DATABASE || 'nisiter',
    },
}
