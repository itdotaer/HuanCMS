var express = require('express');
var router = express.Router();
var userApi = require('../api/user');
var auth = require('../middlewares/auth');

router.route('/users')
    .all(auth.loginRequired)
    .post(userApi.createUser)
    .get(userApi.getUsers);

router.route('/user/:id')
    .all(auth.loginRequired)
    .get(userApi.getById)
    .put(userApi.updateUser)
    .delete(userApi.deleteById);

router.route('/login')
    .post(userApi.userLogin);

module.exports = router;
