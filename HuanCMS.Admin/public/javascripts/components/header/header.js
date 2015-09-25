(function(){
    'use strict';

    angular.module('header')
        .directive('ngHeader', ngHeader);

    //Inject
    ngHeader.$inject = [];

    function ngHeader(){
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'javascripts/components/header/header.html',
            controller: 'HeaderCtrl'
        };

        return directive;
    };
})();
