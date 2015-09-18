var models = require('../models');
var User = models.User;

exports.createUser = function(name, loginName, pwd, email, callback){
    var user = new User({
        name: name,
        loginName: loginName,
        pwd: pwd,
        email: email
    });

    user.save(callback);
};

exports.getUsers = function(opt, callback){
    User.find().limit(opt.size).skip((opt.index - 1) * opt.size)
        .populate('createdBy').populate('lastUpdatedBy').exec(callback);
};

exports.getById = function(userId, callback){
    User.findById({_id: userId}, callback);
};

exports.deleteById = function(userId, callback){
    User.remove({_id: userId}, callback);
};

exports.updateById = function(userId, user, callback){
    var conditions = {_id: userId};
    delete user._id;
    var update = user;
    User.update(conditions, update, callback);
};

exports.userLogin = function(userName, password, callback){
    User.find({loginName: userName, pwd: password}, callback);
};
