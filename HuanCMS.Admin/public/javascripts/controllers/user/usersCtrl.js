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
            userModal(-1, 'add');
        };

        $scope.update = function(userId){
            //Update user modal
            userModal(userId, 'update');
        };

        $scope.delete = function(userId){
            //Delete user modal
            var option = window.confirm('Are you sure to delete this record?');
            if(option){
                userService.delete(userId)
                    .then(function(res){
                        if(res.success && res.success === true){
                            logger.logSuccess('Delete Successed!');
                            $scope.refresh();
                        }else if(res.errorMsg){
                            logger.logError(res.errorMsg);
                        }else{
                            logger.logError('Uncaught error.')
                        }
                    })
                    .catch(function(error){
                        logger.logError(error);
                    })
            }
        };

        $scope.search = function(){
            if(!$scope.searchTxt){
                $scope.refresh();
            }else{
                $scope.pagination = angular.copy(pagination);
                $scope.users = [];
                userService.search($scope.searchTxt, $scope.pagination.index, $scope.pagination.size)
                    .then(function(res){
                        if(res.errorMsg){
                            logger.logError(res.errorMsg);
                        }else if(res.data){
                            $scope.users = res.data;
                            $scope.total = res.total;
                        }else{
                            logger.logError('Uncaught error.');
                        }
                    })
                    .catch(function(error){
                        logger.logError(error);
                    });
            }
        }

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

        function userModal(userId, action, size){
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
                    userId: function () {
                        return userId;
                    },
                    action: function(){
                        return action;
                    }
                }
            });

            modalInstance.result.then(function (savedUser) {
                if(DEBUG) console.log('saved user', savedUser);
                $scope.refresh();
            }, function () {
                // logger.logInfo('Modal dismissed at: ' + new Date());
            });
        }

        function indexOf(users, user){
          var index = -1;
          angular.forEach(users, function(forEachUser, idx){
            if(user._id === forEachUser._id){
              index = idx;
            }
          });

          return index;
        }

        function updateUser(){

        }

        $scope.init();
    }
})();
