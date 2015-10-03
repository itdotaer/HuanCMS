var UserProxy  = require('../proxy').User;
var jwtTool = require('../common/jwtTool');

exports.loginRequired = function(req, res, next){
    var bearerToken;
    var bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        var bearder = bearerHeader.split(' ');

        bearerToken = bearder[1];
        req.token = bearerToken;
        //verify token
        try {
            jwtTool.verify(bearerToken);
        } catch (e) {
            return res.json({errorMsg: 'User need login!'});
        }

        next();
    }else{
        return res.json({errorMsg: 'User need login!'});
    }
};

exports.getLoginUser = function(req, res, next){
    var token = req.token;

    return jwtTool.verify(token);
};
