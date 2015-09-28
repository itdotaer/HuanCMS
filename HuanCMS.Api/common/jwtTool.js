var jwt = require('jsonwebtoken');
var config = require('../config');

exports.signToken = function(user){
    return jwt.sign(user, config.jwtSecret, { expiresInMinutes: config.jwtExp })
}

exports.verify = function(token, callback){
    try {
        var decode = jwt.verify(token, config.jwtSecret);

        return decode;
    } catch (e) {
        throw e;
    }
}
