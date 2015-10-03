var cors = require('cors');

exports.customCors = function(){
    var options = {
        origin: '*',
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization'],
        //maxAge:
        //preflightContinue:

        //Exp:https://www.npmjs.com/package/cors
    };
    return cors(options);
}
