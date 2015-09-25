(function(){
    'use strict';

    angular.module('left')
        .directive('ngLeft', ngLeft);

    //Inject
    ngLeft.$inject = [];

    function ngLeft(){
        var directive = {
            restrict: 'E',
            replace: false,
            templateUrl: 'javascripts/components/leftSider/left.html',
            controller: 'LeftCtrl'
        };

        return directive;
    };
})();
