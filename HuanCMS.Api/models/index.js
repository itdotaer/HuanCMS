var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function(err){
    if(err){
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});


//models
require('./user');
require('./class');
require('./post');

exports.User = mongoose.model('User');
exports.Class = mongoose.model('Class');
exports.Post = mongoose.model('Post');
