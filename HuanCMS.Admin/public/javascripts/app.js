(function() {
    'use strict';
    var app = angular.module('app', ['ui.router', 'angularFileUpload', 'ngCookies', 'angular-md5', 'ui.bootstrap', 'services', 'header', 'left', 'footer', 'login']);

    app.config(['$httpProvider', function($httpProvider) {
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

    router.$inject = ['$stateProvider', '$urlRouterProvider'];
    routeChanged.$inject = ['$cookies', '$state', '$rootScope', '$location', 'userService', 'logger', 'DEBUG'];

    //Router
    app.config(router);
    app.run(routeChanged);

    function router($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: '/views/main.html',
                controller: 'MainCtrl'
            })
            .state('users', {
                url: '/users',
                templateUrl: '/views/user/users.html',
                controller: 'UsersCtrl'
            })
    }

    function routeChanged($cookies, $state, $rootScope, $location, userService, logger, DEBUG) {
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            //Here to get a http request to identify if the user if loged in(session stored user's information)
            //Todo: user's login control
            if($rootScope.isAuthed === true && $rootScope.loginUser){
                return;
            }

            // userService.getLoginUser()
            //     .then(function(res){
            //         if(DEBUG) console.log('res', res);
            //         var loginUser = res.data;
            //         if(loginUser){
            //             $rootScope.isAuthed = true;
            //             $rootScope.loginUser = loginUser;
            //         }else{
            //             $rootScope.isAuthed = false;
            //             $rootScope.loginUser = {};
            //         }
            //     })
            //     .catch(function(error){
            //         logger.logError(error);
            //     });
        });
    }

    //Constants
    app.constant('DEBUG', true);
    app.constant('APIURL', 'http://localhost:3000/api/');
})();
