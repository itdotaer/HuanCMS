var auth = require('../middlewares/auth');

exports.getLoginUserId = function(req, res, next){
    var decodeUser = auth.getLoginUser(req, res, next);
    
    return decodeUser._id;
};
