(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    //Inject modules
    LoginCtrl.$inject = ['$scope', '$rootScope', 'userService', 'logger'];

    function LoginCtrl($scope, $rootScope, userService, logger) {
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
