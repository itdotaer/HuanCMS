var express = require('express');
var router = express.Router();
var userApi = require('../api/user');
var classApi = require('../api/class');
var postApi = require('../api/post');
var auth = require('../middlewares/auth');

// router.route('/users')
//     // .all(auth.loginRequired)
//     .post(userApi.createUser)
//     .get(userApi.getUsers);
//
// router.route('/user/:id')
//     // .all(auth.loginRequired)
//     .get(userApi.getById)
//     .put(userApi.updateUser)
//     .delete(userApi.deleteById);
//
// router.route('/classes')
//     .all(auth.loginRequired)
//     .post(classApi.add)
//     .get(classApi.getAll);
//
// router.route('/class/:id')
//     .all(auth.loginRequired)
//     .get(classApi.getById)
//     .put(classApi.update)
//     .delete(classApi.delete);
//
// router.route('/:classId/posts')
//     .all(auth.loginRequired)
//     .post(postApi.add)
//     .get(postApi.get);
//
// router.route('/:classId/post/:id')
//     .all(auth.loginRequired)
//     .get(postApi.getById)
//     .put(classApi.update)
//     .delete(classApi.delete);

// User
router.post('/users', auth.loginRequired, userApi.createUser)
router.get('/users', auth.loginRequired, userApi.getUsers);

router.get('/user/:id', auth.loginRequired, userApi.getById)
router.put('/user/:id', auth.loginRequired, userApi.updateUser)
router.delete('/user/:id', auth.loginRequired, userApi.deleteById);

//Class
router.post('/classes', auth.loginRequired, classApi.add)
router.get('/classes', classApi.getAll);

router.get('/class/:id', classApi.getById)
router.put('/class/:id', auth.loginRequired, classApi.update)
router.delete('/class/:id', auth.loginRequired, classApi.delete);

//Post
router.post('/:classId/posts', auth.loginRequired, postApi.add)
router.get('/:classId/posts', postApi.get);

router.get('/:classId/post/:id', postApi.getById)
router.put('/:classId/post/:id', auth.loginRequired, classApi.update)
router.delete('/:classId/post/:id', auth.loginRequired, classApi.delete);

//User login
router.post('/users/login', userApi.userLogin);

module.exports = router;
