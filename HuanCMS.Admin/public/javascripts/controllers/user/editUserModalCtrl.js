/*Add or update user modal Controller*/
(function() {
    'use strict';
    angular
        .module('app')
        .controller('EditUserModalCtrl', EditUserModalCtrl);

    //Inject modules
    EditUserModalCtrl.$inject = ['$scope', 'logger', 'userService', '$modalInstance', 'user', 'action', 'DEBUG'];
    function EditUserModalCtrl($scope, logger, userService, $modalInstance, user, action, DEBUG) {
        activate();

        function activate(){
            $scope.action = action;


            $scope.user = user;
            $scope.title = action === 'add' ? 'Add User' : 'Update User';
        }

        $scope.addOrUpdate = function () {
            if(action === 'add'){
                //Todo: add user
                userService.add($scope.user)
                    .then(function(res){
                        var data = res.Data;
                        if(data.HasError){
                            logger.logError(data.ErrorMsg);
                        }else{
                            $modalInstance.close(angular.fromJson(data.Data));
                        }
                    })
                    .catch(function(error){
                        logger.logError(error.Message);
                    });
            }else if(action == 'update'){
                if($scope.user.Id === -1){
                    logger.logError('Update user not legal.');
                    return;
                }

                //Todo: update user
                userService.update($scope.user)
                    .then(function(res){
                        var data = res.Data;
                        if(data.HasError){
                            logger.logError(data.ErrorMsg);
                        }else{
                            $modalInstance.close(angular.fromJson(data.Data));
                        }
                    });
            }
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
    }
})();
