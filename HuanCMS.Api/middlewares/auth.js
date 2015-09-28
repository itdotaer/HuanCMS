var UserProxy  = require('../proxy').User;
var jwtTool = require('../common/jwtTool');

exports.loginRequired = function(req, res, next){
    console.log('cookies', req.cookies);

    if (!req.cookies || !req.cookies.user_token) {
        return res.json({errorMsg: 'User need login!'});
    }else{
        try {
            jwtTool.verify(req.cookies.user_token);
        } catch (e) {
            return res.json({errorMsg: 'Error user_token, please re-login!'});
        }
    }
    next();
};

exports.getLoginUser = function(req, res, next, callback){
    if(!req.cookies || !req.cookies.user_token){
        return callback(null);
    }

    jwtTool.verify(req.cookies.user_token, function(err, decodeUser){
        if(err){
            return callback(null, 'Error user_token, please re-login!');
        }

        console.log('decode user', decodeUser);

        callback(decodeUser);
    });
};
