(function () {
    'use strict';

    angular
        .module('login')
        .controller('LoginCtrl', LoginCtrl);

    //Inject modules
    LoginCtrl.$inject = ['$scope', '$rootScope', 'userService', 'logger', 'DEBUG'];

    function LoginCtrl($scope, $rootScope, userService, logger, DEBUG) {
        $scope.login = function(){
            userService.login({userName: $scope.userName, pwd: $scope.password})
                .then(function(res){
                    if(res.errorMsg){
                        logger.logError(res.errorMsg);
                    }else{
                        if(res.data){
                            //Successed
                            logger.logSuccess('Login Successed!');
                            window.localStorage.setItem('loginUser', angular.toJson(res.data));
                            window.localStorage.setItem('isAuthed', angular.toJson(true));

                            $rootScope.isAuthed = angular.fromJson(window.localStorage.getItem('isAuthed'));
                            $rootScope.loginUser = angular.fromJson(window.localStorage.getItem('loginUser'));

                            if(DEBUG) console.log('userToken', res.userToken);
                            //Set local token.
                            if(res.userToken){
                                window.localStorage.setItem('token', res.userToken);
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
