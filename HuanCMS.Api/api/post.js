var proxy = require('../proxy');
var PostProxy = proxy.Post;
var base = require('./base');

exports.add = function(req, res, next){
    var post = req.body;
    var classId = req.params.classId;

    if(!classId){
        return res.json({errorMsg: 'Add one post no classId.'});
    }

    if(!post){
        return res.json({errorMsg: 'No post data in body.'});
    }

    var operUserId = base.getLoginUserId(req, res, next);

    PostProxy.add(post, operUserId, function(err, post){
        if(err){
            return res.json({errorMsg: err})
        }

        return res.json({data: post});
    });
};

exports.delete = function(req, res, next){
    var id = req.params.id;

    var operUserId = base.getLoginUserId(req, res, next);

    PostProxy.delete(id, operUserId, function(err, count){
        if(err){
            return res.json({errorMsg: err});
        }

        return res.json({success: true});
    });
};

exports.update = function(req, res, next){
    var id= req.params.id;
    var post = req.body;

    var operUserId = base.getLoginUserId(req, res, next);

    PostProxy.update(id, post, operUserId, function(err, count){
        if(err){
            return res.json({errorMsg: err});
        }

        //Update at least one post, if not , alert error
        if(count < 1){
            return  res.json({errorMsg: 'Nothing updated!'});
        }

        return res.json({success: true});
    });
};

exports.getById = function(req, res, next){
    var id = req.params.id;

    PostProxy.getById(id, function(err, post){
        if(err){
            return res.json({errorMsg: err});
        }

        return res.json({data: post});
    });
};

exports.get = function(req, res, next){
    var classId = req.params.classId;
    var index = req.query.index;
    var size = req.query.size;

    if(!classId){
        return res.json({erorMsg: 'ClassId not found!'});
    }

    if(!index){
        return res.json({errorMsg: 'Page Index not found!'});
    }

    if(!size){
        return res.json({errorMsg: 'Page Size not found!'});
    }

    PostProxy.getAll(classId, opt, function(err, posts){
        if(err){
            return res.json({errorMsg: err});
        }

        return res.json({data: posts});
    });
};
