var express = require('express');
var router = express.Router();
var userApi = require('../api/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome to HuanCMS! - Powered By Harry' });
});


router.get('/add', userApi.createUser);
router.get('/getUsers', userApi.getUsers);

router.get('/addUserSession', function(req, res, next){
    if(!req.session.loginUser){
        req.session.loginUser = {_id: '55f2721c3a309f984adcdffb',name: 'harry', loginName: 'harry', pwd: '123'};
    }

    return res.json({userSession: req.session.loginUser});
});

router.get('/checkSession', function(req, res, next){
    return res.json(req.session);
});

router.get('/clearCookie', function(req, res, next){
    res.clearCookie();
    res.end();
});

router.get('/setCookie',function(req, res, next){
    res.cookie('user_token', 'abdcjdoifjodisjfiodsjfji');
    res.end();
});

router.get('/getCookie',function(req, res, next){
    return res.json({'user_token': req.cookies['user_token']});
});

router.get('/testUserLogin', function(req, res, next){
    req.body = {userName: 'harry',pwd: 'harry'};

    userApi.userLogin(req, res, next);
});

module.exports = router;
