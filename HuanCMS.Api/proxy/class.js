var models = require('../models');
var Class = models.Class;

exports.add = function(classEntity, operUserId, callback){
    var classEntity = new Class({
        name: classEntity.name,
        description: classEntity.description,
        parentId: classEntity.parentId || -1,
        createdBy: operUserId,
        updateBy: operUserId
    });

    classEntity.save(classEntity, callback);
};

exports.delete = function(id, operUserId, callback){
    Class.remove({_id: id}, callback);
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
    Class.findById({_id: id}, callback);
};

//获得所有的分类菜单
exports.getAll = function(callback){
    Class.find(callback);
};
