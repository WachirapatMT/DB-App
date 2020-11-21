const MongoClient = require('mongodb').MongoClient;
const Config = require('./config.js');

const connectionURL = Config.MongoDB.CONNECTION_STRING;
 
// Database Name
const dbName = 'nisiter';

let db = undefined;

let initResolve, initReject;
let initPromise = new Promise((resolve, reject) => {
    initResolve = resolve;
    initReject = reject;
})

 
// Use connect method to connect to the server
MongoClient.connect(connectionURL, function(err, client) {
  if (err !== null) {
    console.error(err)
    initReject(err)
    return;
  }

  console.log(`Successfully connected to MongoDB @ ${Config.MongoDB.CONNECTION_STRING}.`);
 
  db = client.db(dbName);
  initResolve(db);
 
  // client.close();
});

exports.init = async function init () {
    if (db) return db;

    return await initPromise;
}

exports.default = db;

// exports.Collection = (name) => {
//     return Mongoose.connection.collection(name);
// }