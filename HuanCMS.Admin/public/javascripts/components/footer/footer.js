(function(){
    'use strict';

    angular.module('footer')
        .directive('ngFooter', ngFooter);

    //Inject
    ngFooter.$inject = [];

    function ngFooter(){
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'javascripts/components/footer/footer.html',
            controller: 'FooterCtrl'
        };

        return directive;
    };
})();
