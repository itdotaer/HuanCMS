var express = require('express');
var router = express.Router();
var userApi = require('../api/user')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome to HuanCMS! - Powered By Harry' });
});

/* Admin Console */
router.get('/admin', function(req, res, next){
    res.render('admin', {title: 'Welcome to HuamCMS admin console - Powered By Harry'});
});

router.get('/add', userApi.createUser);
router.get('/getUsers', userApi.getUsers);

router.get('/addUserSession', function(req, res, next){
    if(!req.session.user){
        req.session.user = {name: 'harry', loginName: 'harry', pwd: '123'};
    }

    return res.json({userSession: req.session.user});
});

router.get('/checkSession', function(req, res, next){
    return res.json(req.session);
});

module.exports = router;
