const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'user',
  password: 'password',
  database: 'nisiter',
  insecureAuth: true,
})

connection.connect(err => {
  if(err) throw err
  console.log("Successfully connected to MySQL.")
})

module.exports = connection