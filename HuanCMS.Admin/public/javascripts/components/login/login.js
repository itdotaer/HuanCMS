(function(){
    'use strict';

    angular.module('login')
        .directive('loginForm', loginForm);

    //Inject
    loginForm.$inject = [];

    function loginForm(){
        var directive = {
            restrict: 'E',
            templateUrl: 'javascripts/components/login/login.html',
            controller: 'LoginCtrl'
        };

        return directive;
    };
})();
