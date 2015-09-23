var models = require('../models');
var Post = models.Post;


exports.add = function(post, operUserId, callback){
    var post = new Post({
        title: post.title,
        description: post.description,
        content: post.content,
        classId: psot.classId,
        createdBy: operUserId,
        updateBy: operUserId
    });

    post.save(post, callback);
};

exports.delete = function(id, operUserId, callback){
    Post.remove({_id: id}, callback);
};

exports.update = function(id, entity, operUserId, callback){
    var conditions = {_id: id};
    delete entity._id;
    delete entity.createdBy;
    delete entity.createdAt;

    entity.updatedAt = new Date();
    entity.updateBy = operUserId;

    var update = entity;

    User.update(conditions, update, callback);
};

exports.getById = function(id, callback){
    Post.findById({_id: id}, callback);
};

//按ClassId分页获得Posts
exports.get = function(classId, opt, callback){
    Post.find({classId: ClassId}).limit(opt.size).skip((opt.index - 1) * opt.size)
        .populate('createdBy').populate('lastUpdatedBy').exec(callback);
};
