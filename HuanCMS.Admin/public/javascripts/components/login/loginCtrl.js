(function () {
    'use strict';

    angular
        .module('login')
        .controller('LoginCtrl', LoginCtrl);

    //Inject modules
    LoginCtrl.$inject = ['$scope', '$rootScope', '$cookieStore', 'userService', 'logger', 'DEBUG'];

    function LoginCtrl($scope, $rootScope, $cookieStore, userService, logger, DEBUG) {
        $scope.login = function(){
            userService.login({userName: $scope.userName, pwd: $scope.password})
                .then(function(res){
                    if(res.errorMsg){
                        logger.logError(res.errorMsg);
                    }else{
                        if(res.data){
                            //Successed
                            logger.logSuccess('Login Successed!');
                            $rootScope.loginUser = res.data;
                            $rootScope.isAuthed = true;

                            if(DEBUG) console.log('userToken', res.userToken);
                            //Set local token.
                            if(res.userToken){
                                $cookieStore.put('user_token', res.userToken);
                                console.log('user_token', $cookieStore.get('user_token'));
                            }else{
                                logger.logError('No user access token!')
                            }
                        }else{
                            logger.logInfo('User or password is wrong!');
                        }
                    }
                })
                .catch(function(err){
                    logger.logError(err);
                });
        };

        $scope.reset = function(){
            $scope.userName = '';
            $scope.password = '';
        };
    }
})();
