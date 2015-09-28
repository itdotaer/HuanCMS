var config = {
    //mongodb配置
    db: 'mongodb://127.0.0.1:27017/HuanCMS-Dev',

    //Session secret
    sessionSecret: 'HuanCMS',
    //Jwt secret
    jwtSecret: 'jwtSecret',
    jwtExp: 10
};

module.exports = config;
