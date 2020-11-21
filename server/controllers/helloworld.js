const MySQL = require('../datasources/mysql.js');
const MongoDB = require('../datasources/mongodb.js');

exports.GetHelloMessage = async (req, res) => {
    // MongoDB.Collection('test').insertOne({});
    // const cursor = MongoDB.Collection('test').find();
    // for (let row = await cursor.next(); row != null; row = await cursor.next()) {
    //     console.log(row);
    // }
    const result = await MySQL.Query(`SELECT * FROM Task;`);
    console.log(result);
    res.send('hello world');
}