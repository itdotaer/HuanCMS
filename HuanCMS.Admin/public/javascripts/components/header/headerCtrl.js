(function(){
    'use strict';

    angular.module('header')
        .controller('HeaderCtrl', HeaderCtrl);

    //Inject
    HeaderCtrl.$inject = ['$scope', '$rootScope'];

    function HeaderCtrl($scope, $rootScope){
        //Enable sidebar toggle
        $("[data-toggle='offcanvas']").click(function(e) {
            e.preventDefault();

            //If window is small enough, enable sidebar push menu
            if ($(window).width() <= 992) {
                $('.row-offcanvas').toggleClass('active');
                $('.left-side').removeClass("collapse-left");
                $(".right-side").removeClass("strech");
                $('.row-offcanvas').toggleClass("relative");
            } else {
                //Else, enable content streching
                $('.left-side').toggleClass("collapse-left");
                $(".right-side").toggleClass("strech");
            }
        });

        $scope.logout = function(){
            $rootScope.isAuthed = false;
            $rootScope.loginUser = {};
        };
    };
})();
