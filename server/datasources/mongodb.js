const Mongoose = require('mongoose');
const Config = require('./config.js');

const connectionURL = Config.MongoDB.CONNECTION_STRING;

Mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log(`Successfully connected to MongoDB @ ${Config.MongoDB.CONNECTION_STRING}.`);
});

exports.Collection = (name) => {
    return Mongoose.connection.collection(name);
}