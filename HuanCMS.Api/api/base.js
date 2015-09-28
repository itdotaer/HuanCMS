var auth = require('../middlewares/auth');

exports.getLoginUserId = function(req, res, next){
    auth.getLoginUser(req, res, next, function(decodeUser, err){
        if(err){
            return res.json({errorMsg: err});
        }

        if(!decodeUser){
            return res.json({errorMsg: 'User not login!'});
        }

        //operUserId
        return decodeUser._id;
    });
};
