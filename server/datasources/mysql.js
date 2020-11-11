const MySQL = require('mysql');
const Config = require('./config.js');

const Connection = MySQL.createConnection({
  host: Config.MySQL.HOST,
  port: Config.MySQL.PORT,
  user: Config.MySQL.USER,
  password: Config.MySQL.PASS,
  database: Config.MySQL.DATABASE,
});

Connection.connect(err => {
  if(err) throw err;
  console.log(`Successfully connected to MySQL @ ${Config.MySQL.HOST}:${Config.MySQL.PORT}.`);
})

exports.Query = (query) => {
  return new Promise((resolve, reject) => {
    Connection.query(query, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
}