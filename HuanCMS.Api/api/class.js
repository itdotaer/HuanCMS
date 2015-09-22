var proxy = require('../proxy');
var ClassProxy = proxy.Class;
var base = require('./base');

exports.add = function(req, res, next){
    req.body = {
        name: 'test' + Math.floor(Math.random() * 9999999999),
        description: 'des',
        parentId: -1
    };

    var classEntity = req.body;

    if(!classEntity){
        return res.json({errorMsg: 'No class data in body.'});
    }

    var operUserId = base.getLoginUserId(req, res, next);

    ClassProxy.add(classEntity, operUserId, function(err, classEntity){
        if(err){
            return res.json({errorMsg: err})
        }

        return res.json({data: classEntity});
    });
};

exports.delete = function(req, res, next){
    var id = req.params.id;

    var operUserId = base.getLoginUserId(req, res, next);

    ClassProxy.delete(id, operUserId, function(err, count){
        if(err){
            return res.json({errorMsg: err});
        }

        return res.json({success: true});
    });
};

exports.update = function(req, res, next){
    var id= req.params.id;
    var classEntity = req.body;

    var operUserId = base.getLoginUserId(req, res, next);

    ClassProxy.update(id, classEntity, operUserId, function(err, count){
        if(err){
            return res.json({errorMsg: err});
        }

        //Update at least one class, if not , alert error
        if(count < 1){
            return  res.json({errorMsg: 'Nothing updated!'});
        }

        return res.json({success: true});
    });
};

exports.getById = function(req, res, next){
    var id = req.params.id;

    ClassProxy.getById(id, function(err, classEntity){
        if(err){
            return res.json({errorMsg: err});
        }

        return res.json({data: classEntity});
    });
};

exports.getAll = function(req, res, next){
    ClassProxy.getAll(function(err, classes){
        if(err){
            return res.json({errorMsg: err});
        }

        return res.json({data: classes});
    });
};
