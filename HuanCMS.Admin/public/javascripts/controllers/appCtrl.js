(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppCtrl', appController);

    //Inject modules
    appController.$inject = ['$scope', 'logger'];

    function appController($scope, logger) {
        $scope.appName = "CMFM";
    }
})();
