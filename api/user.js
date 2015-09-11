var proxy = require('../proxy');
var UserProxy = proxy.User;

exports.createUser = function(req, res, next){
    UserProxy.createUser('name', 'loginname', 'pwd', 'email', function(err, user){
        if(err){
            res.json({errorMsg: err});
        }else{
            res.json({data: user});
        }
    });
};

exports.getUsers = function(req, res, next){
    var opt = {
        index: req.query.index,
        size: req.query.size
    };

    if(!opt.index || !opt.size){
        console.log('opt null!')
    }else{
        UserProxy.getUsers(opt, function(err, users){
            if(err){
                return res.json({errorMsg: err});
            }
            return res.json({data: users});
        });
    }
};

exports.getById = function(req, res, next){
    var userId = req.params.id;
    UserProxy.getById(userId, function(err, user){
        if(err){
            return res.json({errorMsg: err});
        }

        if(!user){
            return res.json({errorMsg: 'User not exist!(Id:' + userId + ')'});
        }

        return res.json({data: user});
    });
};

exports.deleteById = function(req, res, next){
    var userId = req.params.id;
    UserProxy.deleteById(userId, function(err, count){
        if(err){
            return res.json({errorMsg: err});
        }

        return res.json({success: true});
    });
};

exports.updateUser = function(req, req, next){
    var userId = req.params.id;
};

exports.userLogin = function(req, res, next){
    //Login check
    var user = req.body;
    if(!user || !user.userName || !user.pwd){
        //User login info not entire
        res.json({errorMsg: 'UserName and Password is required!'});y
    }

    UserProxy.userLogin(user.userName, user.pwd, function(err, user){
        if(err){
            return res.json({errorMsg: err});
        }

        return res.json({data: user});
    });
};
