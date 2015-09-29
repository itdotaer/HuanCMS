(function(){
    'use strict';

    angular
        .module('app')
        .controller('UsersCtrl', UsersCtrl);
    UsersCtrl.$inject = ['$scope', 'userService', 'logger', 'DEBUG'];

    function UsersCtrl($scope, userService, logger, DEBUG){
        userService.get(1, 10)
            .then(function(res){
                if(res.errorMsg){
                    logger.logError(res.errorMsg);
                }else{
                    $scope.users = res.data;
                }
            })
            .catch(function(error){
                logger.logError(error);
            });
    }
})();
