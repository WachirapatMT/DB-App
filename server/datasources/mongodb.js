const Mongoose = require('mongoose');
const Config = require('./config.js');

const connectionURL = `mongodb://${Config.MongoDB.USER}:${Config.MongoDB.PASS}@${Config.MongoDB.HOST}:${Config.MongoDB.PORT}/${Config.MongoDB.DATABASE}?authSource=admin`;

Mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log(`Successfully connected to MongoDB @ ${Config.MongoDB.HOST}:${Config.MongoDB.PORT}.`);
});

exports.Collection = (name) => {
    return Mongoose.connection.collection(name);
}