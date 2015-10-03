var proxy = require('./proxy');
var UserProxy = proxy.User;

// 55f2721c3a309f984adcdffb
function creatAdminUser(){
  var user = {
    name: 'Harry Hu',
    loginName: 'harry',
    pwd: 'harry',
    email: 'hujiangtao1235@qq.com'
  };

  UserProxy.createUser(user.name, user.loginName, user.pwd, user.email, '55f2721c3a309f984adcdffb', function(err, cbUser){
    if(err){
      console.log('===>Create AdminUser Error: \n' + err);
    }

    console.log('===>Create AdminUser Successed: \n' + cbUser);
  });
}

creatAdminUser();
