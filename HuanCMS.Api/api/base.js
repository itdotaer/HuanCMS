var auth = require('../middlewares/auth');

exports.getLoginUserId = function(req, res, next){
    var loginUser = auth.getLoginUser(req, res, next);

    if(!loginUser){
        return res.status(403).json({errorMsg: 'User not login!'});
    }

    //operUserId
    return loginUser._id;
};
