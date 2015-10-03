var models = require('../models');
var User = models.User;

exports.createUser = function(name, loginName, pwd, email, operUserId, callback){
    var user = new User({
        name: name,
        loginName: loginName,
        pwd: pwd,
        email: email
    });

    user.updatedBy = operUserId || -1;
    user.createdBy = operUserId || -1;

    user.save(callback);
};

exports.getUsers = function(opt, callback){
    User.find().limit(opt.size).skip((opt.index - 1) * opt.size)
        .populate('createdBy', 'name').populate('updatedBy', 'name')
        .select('_id name loginName email createdAt createdBy updatedAt updatedBy')
        .exec(callback);
};

exports.getUsersTotalCount = function(callback){
    User.count({}, callback);
};

exports.getById = function(userId, callback){
    User.findById({_id: userId}, callback);
};

exports.deleteById = function(userId, operUserId, callback){
    User.remove({_id: userId}, callback);
};

exports.updateById = function(userId, user, operUserId, callback){
    var conditions = {_id: userId};
    delete user._id;
    delete user.createdAt;
    delete user.createdBy;

    user.updatedAt = new Date();
    user.updatedBy = operUserId;

    var update = user;
    User.update(conditions, update, callback);
};

exports.userLogin = function(userName, password, callback){
    User.findOne({loginName: userName, pwd: password}).select('_id name loginName pwd email').exec(callback);
};

exports.search = function(searchTxt, opt, callback){
    User.find({loginName: searchTxt}).limit(opt.size).skip((opt.index - 1) * opt.size)
        .populate('createdBy', 'name').populate('updatedBy', 'name')
        .select('_id name loginName email createdAt createdBy updatedAt updatedBy')
        .exec(callback);
};

exports.searchTotal = function(searchTxt, callback){
    User.count({loginName: searchTxt}, callback);
};