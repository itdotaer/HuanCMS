/*Add or update user modal Controller*/
(function() {
  'use strict';
  angular
    .module('app')
    .controller('EditUserModalCtrl', EditUserModalCtrl);

  //Inject modules
  EditUserModalCtrl.$inject = ['$scope', 'logger', 'userService', '$modalInstance', 'userId', 'action', 'DEBUG'];

  function EditUserModalCtrl($scope, logger, userService, $modalInstance, userId, action, DEBUG) {
    $scope.init = function() {
      $scope.action = action;

      $scope.userId = userId;
      if($scope.userId){
        userService.getById(userId)
          .then(function(res){
            if(res.errorMsg){
              logger.logError(errorMsg);
            }else if(res.data){
              $scope.user = res.data;
              $scope.password = {pwd: $scope.user.pwd, rePwd: $scope.user.pwd};
              $scope.pwdIsTheSame = true;
            }else{
              logger.logError('Uncaught error.');
            }
          })
          .catch(function(errpr){
            logger.logError(error);
          })
      }
      $scope.title = action === 'add' ? 'Add User' : 'Update User';
    }

    $scope.addOrUpdate = function() {
      if (action === 'add') {
        //Todo: add user
        $scope.user.pwd = $scope.password.pwd;
        userService.add($scope.user)
          .then(function(res) {
            if (res.errorMsg) {
              logger.logError(angular.toJson(res.errorMsg));
            } else if (res.data) {
              $modalInstance.close(res.data);
              logger.logSuccess('Create successed!');
            } else {
              logger.logError('Uncaught error!')
            }
          })
          .catch(function(error) {
            logger.logError(error);
          });
      } else if (action == 'update') {
        //Todo: update user
        userService.update($scope.user)
          .then(function(res) {
            if (res.errorMsg) {
              logger.logError(res.errorMsg);
            } else if (res.success) {
              $modalInstance.close();
              logger.logSuccess('Create successed!');
            } else {
              logger.logError('Uncaught error!')
            }
          });
      }
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.$watchCollection('password', function(newValue, oldValue){
      if(typeof oldValue  === 'undefined' || typeof newValue === 'undefined'){
        return;
      }

      if(newValue.pwd != newValue.rePwd){
        $scope.message = 'Password isn\'t the same';
        $scope.pwdIsTheSame = false;
      }else{
        $scope.message = '';
        $scope.pwdIsTheSame = true;
      }
    });
    $scope.init();
  }
})();