var express = require('express');
var router = express.Router();
var userApi = require('../api/user');
var classApi = require('../api/class');
var auth = require('../middlewares/auth');

router.route('/users')
    // .all(auth.loginRequired)
    .post(userApi.createUser)
    .get(userApi.getUsers);

router.route('/user/:id')
    // .all(auth.loginRequired)
    .get(userApi.getById)
    .put(userApi.updateUser)
    .delete(userApi.deleteById);

router.route('/classes')
    .all(auth.loginRequired)
    .post(classApi.add)
    .get(classApi.getAll);

router.route('/class/:id')
    .all(auth.loginRequired)
    .get(classApi.getById)
    .put(classApi.update)
    .delete(classApi.delete);

router.route('/login')
    .post(userApi.userLogin);

module.exports = router;
