var mongoose = require('mongoose');
var config = require('./config.json');

//URL for Connection MongoDB
const env = process.env.NODE_ENV ? process.env.NODE_ENV : config.env;
var URL = process.env.URL || 'mongodb://' + config.mongo[env].host ;

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//Connection establishment
mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//Status
var dbtask = mongoose.connection;
dbtask.on('error', () => {
    console.error('Error occured in dbtask connection');
});

dbtask.on('open', () => {
    console.log('DB Connection');
});