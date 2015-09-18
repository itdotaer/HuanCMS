(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    //Inject modules
    MainCtrl.$inject = ['$scope', 'logger'];

    function MainCtrl($scope, logger) {
        $scope.appName = "CMFM";
    }
})();
