var proxy = require('../proxy');
var UserProxy = proxy.User;
var base = require('./base');
var auth = require('../middlewares/auth');
var jwtTool = require('../common/jwtTool');

exports.createUser = function(req, res, next){
    var user = req.body;

    if(!user){
        return res.json({errorMsg: 'No user data in body.'});
    }

    if(!user.name || !user.loginName || !user.pwd || !user.email){
      return res.json({errorMsg: 'User info not entire.'});
    }

    var operUserId = base.getLoginUserId(req, res, next);

    UserProxy.createUser(user.name, user.loginName, user.pwd, user.email, operUserId, function(err, user){
        if(err){
            return res.json({errorMsg: err});
        }

        return res.json({data: user});
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

            UserProxy.getUsersTotalCount(function(err, count){
                if(err){
                    return res.json({errorMsg: err});
                }

                return res.json({data: users, count: count});
            });
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

    var operUserId = base.getLoginUserId(req, res, next);

    UserProxy.deleteById(userId, operUserId, function(err, count){
        if(err){
            return res.json({errorMsg: err});
        }

        return res.json({success: true});
    });
};

exports.updateUser = function(req, res, next){
    var userId = req.params.id;
    var user = req.body;

    console.log('userId', userId);
    console.log('user', user);

    if(!user){
        return res.json({errorMsg: 'No user data in body.'});
    }

    var operUserId = base.getLoginUserId(req, res, next);

    UserProxy.updateById(userId, user, operUserId, function(err, count){
        if(err){
            return res.json({errorMsg: err});
        }

        return res.json({success: true});
    });
};

exports.userLogin = function(req, res, next){
    //Login check
    var user = req.body;
    if(!user || !user.userName || !user.pwd){
        //User login info not entire
        return res.json({errorMsg: 'UserName and Password is required!'});y
    }

    UserProxy.userLogin(user.userName, user.pwd, function(err, user){
        if(err){
            return res.json({errorMsg: err});
        }

        var userToken = '';

        if(user){
            userToken = jwtTool.signToken(user);
            //Delete user pwd
            user.pwd = '';
        }

        return res.send({data: user, userToken: userToken});
    });
};

exports.search = function(req, res, next){
    var opt = {
        index: req.query.index,
        size: req.query.size
    };

    var searchTxt = req.body.searchTxt;

    if(!opt.index || !opt.size){
        console.log('opt null!')
    }else{
        UserProxy.search(searchTxt, opt, function(err, users){
            if(err){
                return res.json({errorMsg: err});
            }
            UserProxy.searchTotal(searchTxt, function(err, count){
                if(err){
                    return res.json({errorMsg: err});
                }
                console.log('users count', count)
                return res.json({data: users, count: count});
            });
        });
    }
};