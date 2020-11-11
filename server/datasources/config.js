module.exports = {
    MongoDB: {
        HOST: process.env.MONGODB_HOST || 'localhost',
        PORT: process.env.MONGODB_PORT || 27017,
        USER: process.env.MONGODB_USER || 'root',
        PASS: process.env.MONGODB_PASS || 'password',
        DATABASE: process.env.MONGODB_DATABASE || 'nisiter',
    },
    MySQL: {
        HOST: process.env.MYSQL_HOST || 'localhost',
        PORT: process.env.MYSQL_PORT || 3306,
        USER: process.env.MYSQL_USER || 'root',
        PASS: process.env.MYSQL_PASS || 'password',
        DATABASE: process.env.MYSQL_DATABASE || 'nisiter',
    },
}
