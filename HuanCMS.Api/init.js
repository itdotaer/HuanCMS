var proxy = require('./proxy');
var UserProxy = proxy.User;
var ClassProxy = proxy.Class;

// 55f2721c3a309f984adcdffb
function creatAdminUser() {
    var user = {
        name: 'Harry Hu',
        loginName: 'harry',
        pwd: 'harry',
        email: 'hujiangtao1235@qq.com'
    };

    UserProxy.createUser(user.name, user.loginName, user.pwd, user.email, '55f2721c3a309f984adcdffb', function(err, cbUser) {
        if (err) {
            console.log('===>Create AdminUser Error: \n' + err);
            return;
        }

        console.log('===>Create AdminUser Successed: \n' + cbUser);
    });
}

function getOneDbUser(callback){
    var opt = {
        size: 1,
        index: 1
    };
    UserProxy.getUsers(opt, function(err, users){
        return callback(err, users[0]);
    });
}

function createDefaultClasses() {
    var parentClass = {
        name: '父节点一',
        description: '这是测试父节点一描述',
        parentId: -1,
    };

    var childClass = {
        name: '子节点一',
        description: '这是测试子节点一描述',
        parentId: -1//Will be set to the parent's id after saved to db
    };

    getOneDbUser(function(err, user){
        if(err){
            console.log('===>Get One Default User Error:\n' + err);
            return;
        }

        ClassProxy.add(parentClass, user._id, function(err, cbClass){
            if(err){
                console.log('===>Create Parent Class Error:\n' + err);
                return;
            }

            console.log('===>Create Parent Calss Successed:\n' + cbClass);

            //Set parentId
            childClass.parentId = cbClass._id;
            ClassProxy.add(childClass, user._id, function(err, cbClass){
                if(err){
                    console.log('===>Create Child Class Error:\n' + err);
                    return;
                }

                console.log('===>Create Child Class Successed:\n' + cbClass);
            });
        });
    });
}

creatAdminUser();
createDefaultClasses();