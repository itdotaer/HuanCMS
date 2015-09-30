(function(){
    'use strict';

    angular
        .module('app')
        .controller('UsersCtrl', UsersCtrl);
    UsersCtrl.$inject = ['$scope', '$modal', 'userService', 'logger', 'DEBUG'];

    function UsersCtrl($scope, $modal, userService, logger, DEBUG){
        var pagination = {
            index: 1,
            size: 100
        };

        $scope.init = function(){
            $scope.pagination = angular.copy(pagination);
            $scope.users = [];
            get();
        };

        $scope.refresh = function(){
            $scope.init();
        };

        $scope.pageChanged = function(){
            get();
        };

        $scope.add = function(){
            //Add user modal
            userModal({}, 'add');
        };

        $scope.update = function(user){
            //Update user modal
            userModal(user, 'update');
        };

        $scope.delete = function(user){
            //Delete user modal
            var option = window.confirm('Are you sure to delete this record?');
            if(option){
                userService.delete(user._id)
                    .then(function(res){
                        if(res.success && res.success === true){
                            logger.logSuccess('Delete Successed!');
                        }else if(res.errorMsg){
                            logger.logError(res.errorMsg);
                        }
                    })
                    .catch(function(error){
                        logger.logError(error);
                    })
            }
        };

        function get(){
            userService.get($scope.pagination.index, $scope.pagination.size)
                .then(function(res){
                    if(res.errorMsg){
                        logger.logError(res.errorMsg);
                    }else{
                        $scope.users = res.data;
                        $scope.count = res.count;
                    }
                })
                .catch(function(error){
                    logger.logError(error);
                });
        }

        function userModal(user, action, size){
            if(!size){
                size = 'normal';
            }
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '/views/user/editUserModal.html',
                controller: 'EditUserModalCtrl',
                size: size,
                backdrop: 'static',
                resolve: {
                    user: function () {
                        return user;
                    },
                    action: function(){
                        return action;
                    }
                }
            });

            modalInstance.result.then(function (savedUser) {
                if(DEBUG) console.log('savedUser', savedUser);
                logger.logSuccess("Successed!");
                updateUsers(savedUser);
            }, function () {
                // logger.logInfo('Modal dismissed at: ' + new Date());
            });
        }

        $scope.init();
    }
})();
